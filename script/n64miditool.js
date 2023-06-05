/*
    This is a javascript port of the MIDI -> Binary functionality (specifically for DK64) from N64 Midi Tool
    As such, a lot of this code is very very similar to the cpp version made by jombo-23 and SubDrag

    Converted by Ballaam
    Please support the original creators of the cpp desktop applet @ https://github.com/jombo23/N64-Tools/tree/master/N64MidiTool
*/

/* requirements:
    file-buffer.js
*/

const TRACK_LIMIT_BIG = 0x20
const TRACK_LIMIT_SMALL = 16
const EVENT_LIMIT = 0x30000
const POINTER_TABLE_OFFSET = 0x101C50
let instrument_change_addresses = [];

class Event {
    constructor() {
        this.contents = null
        this.type = 0
        this.abs_time = 0
        this.content_size = 0
        this.delta_time = 0
        this.obsolete_event = false
        this.duration_time = 0
    }
}

class Return_GVLB {
    constructor (offset, original, alt_pattern, alt_offset, alt_length, Vlength) {
        this.offset = offset
        this.original = original
        this.alt_pattern = alt_pattern
        this.alt_offset = alt_offset
        this.alt_length = alt_length
        this.vlength = Vlength
    }
}

class Return_RMB {
    constructor (offset, altPattern, altOffset, altLength, returnByte) {
        this.offset = offset
        this.altPattern = altPattern
        this.altOffset = altOffset
        this.altLength = altLength
        this.returnByte = returnByte
    }
}

class Return_RVLB {
    constructor (lngth, newValue) {
        this.lngth = lngth
        this.newValue = newValue
    }
}

function Flip32Bit(inLong) {
    return (((inLong & 0xFF000000) >> 24) | ((inLong & 0x00FF0000) >> 8) | ((inLong & 0x0000FF00) << 8) | ((inLong & 0x000000FF) << 24))
}

function WriteLongToBuffer(buffer, address, data) {
    if (Array.isArray(buffer)) {
        // Array
        buffer[address] = ((data >> 24) & 0xFF)
        buffer[address+1] = ((data >> 16) & 0xFF)
        buffer[address+2] = ((data >> 8) & 0xFF)
        buffer[address+3] = ((data) & 0xFF)
    } else {
        // Bytes
        buffer.seek(address)
        buffer.writeNum(data, 4)
    }
}

function GetVLBytes(vlByteArray, offset, original, alt_pattern, alt_offset, alt_length, includeFERepeats) {
    VLVal = 0
    TempByte = null
    while (true) {
        if (alt_pattern != null) {
            TempByte = alt_pattern[alt_offset]
            alt_offset += 1
            if (alt_offset == alt_length) {
                alt_pattern = null
                alt_offset = 0
                alt_length = 0
            }
        } else {
            vlByteArray.seek(offset)
            TempByte = vlByteArray.readNum(1)
            offset += 1
            vlByteArray.seek(offset)
            val = vlByteArray.readNum(1)
            if ((TempByte == 0xFE) && (val != 0xFE) && includeFERepeats) {
                vlByteArray.seek(offset)
                repeatFirstByte = vlByteArray.readNum(1)
                offset += 1
                vlByteArray.seek(offset)
                repeatDistanceFromBeginningMarker = ((repeatFirstByte << 8) | vlByteArray.readNum(1))
                offset += 1
                vlByteArray.seek(offset)
                repeatCount = vlByteArray.readNum(1)
                offset += 1
                alt_pattern = Array(repeatCount).fill(null)
                copy = (offset - 4) - repeatDistanceFromBeginningMarker
                while (copy < ((offset - 4) - repeatDistanceFromBeginningMarker) + repeatCount) {
                    vlByteArray.seek(copy)
                    alt_pattern[copy - ((offset - 4) - repeatDistanceFromBeginningMarker)] = vlByteArray.readNum(1)
                    copy += 1
                }
                alt_offset = 0
                alt_length = repeatCount
                TempByte = alt_pattern[alt_offset]
                alt_offset += 1
            } else if ((TempByte == 0xFE) && (val == 0xFE) && includeFERepeats) {
                offset += 1
            }
            if ((alt_offset == alt_length) && (alt_pattern != null)) {
                alt_pattern = null
                alt_offset = 0
                alt_length = 0
            }
        }
        if ((TempByte >> 7) == 0x1) {
            VLVal += TempByte
            VLVal = VLVal << 8
        } else {
            VLVal += TempByte
            break
        }
    }
    original = VLVal
    Vlength = 0
    c = 0
    a = 0
    while (true) {
        Vlength += (((VLVal >> c) & 0x7F) << a)
        if (c == 24) {
            break
        }
        c += 8
        a += 7
    }
    return new Return_GVLB(offset, original, alt_pattern, alt_offset, alt_length, Vlength);
}

function ReadMidiByte(vlByteArray, offset, altPattern, altOffset, altLength, includeFERepeats) {
    returnByte = null
    if (altPattern != null) {
        returnByte = altPattern[altOffset]
        altOffset += 1
    } else {
        vlByteArray.seek(offset)
        returnByte = vlByteArray.readNum(1)
        offset += 1
        vlByteArray.seek(offset)
        val = vlByteArray.readNum(1)
        if ((returnByte == 0xFE) && (val != 0xFE) && includeFERepeats) {
            vlByteArray.seek(offset)
            repeatFirstByte = vlByteArray.readNum(1)
            offset += 1
            vlByteArray.seek(offset)
            repeatDistanceFromBeginningMarker = (repeatFirstByte << 8) | vlByteArray.readNum(1)
            offset += 1
            vlByteArray.seek(offset)
            repeatCount = vlByteArray.readNum(1)
            offset += 1
            altPattern = Array(repeatCount).fill(null)
            copy = (offset - 4) - repeatDistanceFromBeginningMarker
            while (copy < ((offset - 4) - repeatDistanceFromBeginningMarker) + repeatCount) {
                vlByteArray.seek(copy)
                altPattern[copy - ((offset - 4) - repeatDistanceFromBeginningMarker)] = vlByteArray.readNum(1)
            }
            altOffset = 0
            altLength = repeatCount
            returnByte = altPattern[altOffset]
            altOffset += 1
        } else if ((returnByte == 0xFE) && (val == 0xFE) && includeFERepeats) {
            offset += 1
        }
    }
    if ((altOffset == altLength) && (altPattern != null)) {
        altPattern = null
        altOffset = 0
        altLength = 0
    }
    return new Return_RMB(offset, altPattern, altOffset, altLength, returnByte)
}

function ReturnVLBytes(value, length) {
    subValue1 = (value >> 21) & 0x7F
    subValue2 = (value >> 14) & 0x7F
    subValue3 = (value >> 7) & 0x7F
    subValue4 = (value >> 0) & 0x7F

    if (subValue1 > 0) {
        newValue = 0x80808000
        newValue |= (subValue1 << 24)
        newValue |= (subValue2 << 16)
        newValue |= (subValue3 << 8)
        newValue |= subValue4
        length = 4
        return new Return_RVLB(length, newValue)
    } else if (subValue2 > 0) {
        newValue = 0x00808000
        newValue |= (subValue2 << 16)
        newValue |= (subValue3 << 8)
        newValue |= subValue4
        length = 3
        return new Return_RVLB(length, newValue)
    } else if (subValue3 > 0) {
        newValue = 0x00008000
        newValue |= (subValue3 << 8)
        newValue |= subValue4
        length = 2
        return new Return_RVLB(length, newValue)
    } else {
        length = 1
        return new Return_RVLB(length, value)
    }
}

function WriteVLBytes(outFile, value, length, includeFERepeats) {
    tempByte = null
    if (length == 1) {
        tempByte = value & 0xFF
        outFile.writeNum(tempByte, 1)
    } else if (length == 2) {
        tempByte = (value >> 8) & 0xFF
        outFile.writeNum(tempByte, 1)
        tempByte = value & 0xFF
        outFile.writeNum(tempByte, 1)
    } else if (length == 3) {
        tempByte = (value >> 16) & 0xFF
        outFile.writeNum(tempByte, 1)
        tempByte = (value >> 8) & 0xFF
        outFile.writeNum(tempByte, 1)
        tempByte = value & 0xFF
        outFile.writeNum(tempByte, 1)
    } else {
        tempByte = (value >> 24) & 0xFF
        outFile.writeNum(tempByte, 1)
        tempByte = (value >> 8) & 0xFF
        outFile.writeNum(tempByte, 1)
        tempByte = value & 0xFF
        outFile.writeNum(tempByte, 1)
    }
}

function readFromArray(array, start, length) {
    let amt = 0;
    for (let i = 0; i < length; i++) {
        amt *= 256
        amt + array[start + i]
    }
    return amt
}

function eventInBounds(event_value, previous_event_value, lower_bound, upper_bound, status) {
    if ((event_value >= lower_bound) && (event_value < upper_bound)) {
        return true
    }
    if (status) {
        if ((previous_event_value >= lower_bound) && (previous_event_value < upper_bound)) {
            return true
        }
    }
    return false
}

function MidiToGEFormat(in_file, bin, has_loop, loop_point, no_repeaters) {
    unused_storage = null
    attempt = new BufferFile([])
    numberTracks = 0
    track_events = []
    track_event_count = Array(TRACK_LIMIT_BIG).fill(0)
    instrument_change_addresses = []
    for (let x = 0; x < TRACK_LIMIT_BIG; x++) {
        track_events.push([])
        for (let y = 0; y < EVENT_LIMIT; y++) {
            track_events[x].push(new Event())
        }
    }
    data = in_file.slice()
    data_size = data.length
    temp = new BufferFile(data)
    temp.seek(0)
    if (temp.readNum(4) != 0x4D546864) {
        throw new Error ("Invalid Midi Header")
    }
    header_length = temp.readNum(4) // 0x4
    midi_type = temp.readNum(2) // 0x8
    num_tracks = temp.readNum(2) // 0xA
    tempo = temp.readNum(2) // 0xC
    if (num_tracks > TRACK_LIMIT_SMALL) {
        console.log(`Too many tracks, truncating to ${TRACK_LIMIT_SMALL}`)
        num_tracks = TRACK_LIMIT_SMALL
    }
    numberTracks = num_tracks
    if (![0, 1].includes(midi_type)) {
        throw new Error ("Invalid Midi Type")
    }
    position = 0xE
    repeatPattern = null
    alt_offset = 0
    alt_length = 0
    unknown_var = false
    highest_abs_time = 0
    highest_abs_time_by_track = Array(TRACK_LIMIT_SMALL).fill(0)
    for (let trackNum = 0; trackNum < numberTracks; trackNum++) {
        original = null
        abs_time = 0
        temp.seek(position)
        track_header = temp.readNum(4)
        if (track_header != 0x4D54726B) {
            throw new Error("Invalid Track Midi Header")
        }
        track_length = temp.readNum(4)
        position += 8
        previous_event_value = 0xFF
        endFlag = false
        while ((!endFlag) && (position < data_size)) {
            original = null

            gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
            position = gvlb.offset
            original = gvlb.original
            repeatPattern = gvlb.alt_pattern
            alt_offset = gvlb.alt_offset
            alt_length = gvlb.alt_length
            timeTag = gvlb.vlength
            abs_time += timeTag
            rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
            position = rmb.offset
            repeatPattern = rmb.altPattern
            alt_offset = rmb.altOffset
            alt_length = rmb.altLength
            eventVal = rmb.returnByte
            status_bit = false
            if (eventVal <= 0x7F) { // Continuation
                status_bit = true
            }
            if (eventVal == 0xFF) { // Meta Event
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                sub_type = rmb.returnByte
                if (sub_type == 0x2F) { // End of track event
                    abs_time -= timeTag
                    endFlag = true
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                } else if (sub_type == 0x51) { // Set Tempo Event
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                } else if ((sub_type < 0x7F) && (![0x51,0x2F].includes(sub_type))) { // Various Unused Meta Events
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                    for (let i = 0; i < length; i++) {
                        rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                        position = rmb.offset
                        repeatPattern = rmb.altPattern
                        alt_offset = rmb.altOffset
                        alt_length = rmb.altLength
                    }
                } else if (sub_type == 0x7F) { // Unused Sequencer Specific Event
                    gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
                    position = gvlb.offset
                    original = gvlb.original
                    repeatPattern = gvlb.alt_pattern
                    alt_offset = gvlb.alt_offset
                    alt_length = gvlb.alt_length
                    length = gvlb.vlength
                    for (let i = 0; i < length; i++) {
                        rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                        position = rmb.offset
                        repeatPattern = rmb.altPattern
                        alt_offset = rmb.altOffset
                        alt_length = rmb.altLength
                    }
                }
                previous_event_value = eventVal
            } else if (eventInBounds(eventVal, previous_event_value, 0x80, 0x90, status_bit)) {
                current_event_value = null
                note_number = null
                if (status_bit) {
                    note_number = eventVal
                    current_event_value = previous_event_value
                } else {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    note_number = rmb.returnByte
                    current_event_value = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                velocity = rmb.returnByte
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0x90, 0xA0, status_bit)) {
                current_event_value = previous_event_value
                note_number = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    note_number = rmb.returnByte
                    current_event_value = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                velocity = rmb.returnByte
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xB0, 0xC0, status_bit)) {
                // Controller Change
                controller_type = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    controller_type = rmb.returnByte
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                controller_value = rmb.returnByte
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xC0, 0xD0, status_bit)) {
                // Instrument Change
                instrument = eventVal
                instrument_change_addresses.push(position)
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    instrument = rmb.returnByte
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xD0, 0xE0, status_bit)) {
                // Channel Aftertouch
                amount = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    amount = rmb.returnByte
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xE0, 0xF0, status_bit)) {
                // Pitch Bend
                value_lsb = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    value_lsb = rmb.returnByte
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                value_lsb = rmb.returnByte
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if ([0xF0,0xF7].includes(eventVal)) {
                gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
                position = gvlb.offset
                original = gvlb.original
                repeatPattern = gvlb.alt_pattern
                alt_offset = gvlb.alt_offset
                alt_length = gvlb.alt_length
                length = gvlb.vlength
                for (let i = 0; i < length; i++) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                }
            } else {
                if (!unknown_var) {
                    unknown_var = true
                    throw new Error(`Invalid Midi Character Found (${eventVal})`)
                }
            }
        }
        if (abs_time > highest_abs_time) {
            highest_abs_time = abs_time
        }
        if (abs_time > highest_abs_time_by_track[trackNum]) {
            highest_abs_time_by_track[trackNum] = abs_time
        }
    }
    position = 0xE
    repeatPattern = null
    alt_offset = 0
    alt_length = 0
    for (let trackNum = 0; trackNum < numberTracks; trackNum++) {
        abs_time = 0
        temp.seek(position)
        track_header = temp.readNum(4)
        if (track_header != 0x4D54726B) {
            throw new Error("Invalid Track Midi Header")
        }
        track_length = temp.readNum(4)
        position += 8
        previous_event_value = 0xFF
        endFlag = false
        didLoop = false
        if ((has_loop) && (loop_point == 0) && (highest_abs_time_by_track[trackNum] > 0)) {
            te = track_events[trackNum][track_event_count[trackNum]]
            te.type = 0xFF
            te.abs_time = 0
            te.content_size = 3
            te.contents = [0x2E, 0x00, 0xFF]
            te.delta_time = 0
            te.obsolete_event = false
            ste = te;
            track_event_count[trackNum] += 1
            didLoop = true
        }
        while ((!endFlag) && (position < data_size)) {
            original = null
            gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
            position = gvlb.offset
            original = gvlb.original
            repeatPattern = gvlb.alt_pattern
            alt_offset = gvlb.alt_offset
            alt_length = gvlb.alt_length
            timeTag = gvlb.vlength
            abs_time += timeTag
            te = track_events[trackNum][track_event_count[trackNum]]
            ste = te;
            te.delta_time = timeTag
            te.obsolete_event = false
            te.contents = null
            te.abs_time = abs_time
            if ((has_loop) && (!didLoop) && (highest_abs_time_by_track[trackNum] > loop_point)) {
                // Handle Looping
                if (abs_time == loop_point) {
                    te = track_events[trackNum][track_event_count[trackNum]]
                    te.type = 0xFF
                    te.abs_time = abs_time
                    te.content_size = 3
                    te.contents = [0x2E, 0x00, 0xFF]
                    te.delta_time = timeTag
                    te.obsolete_event = false
                    track_event_count[trackNum] += 1
                    te = track_events[trackNum][track_event_count[trackNum]]
                    ste = te;
                    te.delta_time = 0
                    te.obsolete_event = false
                    te.contents = null
                    te.abs_time = abs_time
                    didLoop = true
                } else if (abs_time > loop_point) {
                    te = track_events[trackNum][track_event_count[trackNum]]
                    te.type = 0xFF
                    te.abs_time = loop_point
                    te.content_size = 3
                    te.contents = [0x2E, 0x00, 0xFF]
                    if (track_event_count[trackNum] > 0) {
                        te.delta_time = loop_point - track_events[trackNum][track_event_count[trackNum] - 1].abs_time
                    } else {
                        te.delta_time = loop_point
                    }
                    track_event_count[trackNum] += 1
                    te = track_events[trackNum][track_event_count[trackNum]]
                    ste = te;
                    te.delta_time = abs_time - loop_point
                    te.obsolete_event = false
                    te.contents = null
                    te.abs_time = abs_time
                    didLoop = true
                }
            }
            rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
            position = rmb.offset
            repeatPattern = rmb.altPattern
            alt_offset = rmb.altOffset
            alt_length = rmb.altLength
            eventVal = rmb.returnByte
            status_bit = false
            if (eventVal <= 0x7F) { // Continuation
                status_bit = true
            } else {
                status_bit = false
            }
            if (eventVal == 0xFF) { // Meta Event
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                sub_type = rmb.returnByte
                if (sub_type == 0x2F) { // End of Track event
                    endFlag = true
                    if ((has_loop) && (highest_abs_time_by_track[trackNum] > loop_point)) {
                        previous_event = track_events[trackNum][track_event_count[trackNum] - 1]
                        if ((previous_event.type == 0xFF) && (previous_event.content_size > 0) && (previous_event.contents[0] == 0x2E)) {
                            previous_event.type = 0xFF
                            previous_event.content_size = 1
                            previous_event.contents = [0x2F]
                        } else {
                            nte = track_events[trackNum][track_event_count[trackNum] + 1]
                            nte.abs_time = highest_abs_time
                            nte.delta_time = 0
                            nte.duration_time = ste.duration_time
                            nte.obsolete_event = ste.obsolete_event
                            nte.type = 0xFF
                            nte.content_size = 1
                            nte.contents = [0x2F]
                            ste.type = 0xFF
                            if (highest_abs_time > (previous_event.abs_time + previous_event.duration_time)) {
                                ste.delta_time = highest_abs_time - (previous_event.abs_time + previous_event.duration_time)
                                ste.abs_time = highest_abs_time
                            } else {
                                ste.delta_time = 0
                                ste.abs_time = previous_event.abs_time
                            }
                            ste.content_size = 7
                            ste.contents = [0x2D, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00]
                            ste.obsolete_event = false
                            track_event_count[trackNum] += 1
                        }
                    } else {
                        ste.type = 0xFF
                        ste.content_size = 1
                        ste.contents = [0x2F]
                    }
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                } else if (sub_type == 0x51) { // Set Tempo Event
                    ste.type = 0xFF
                    ste.content_size = 4
                    ste.contents = [0x51, null, null, null]
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    ste.contents[1] = rmb.returnByte
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    ste.contents[2] = rmb.returnByte
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    ste.contents[3] = rmb.returnByte
                } else if ((sub_type < 0x7F) && (![0x51,0x2F].includes(sub_type))) { // Various unused meta events
                    ste.type = 0xFF
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    length = rmb.returnByte
                    for (let i = 0; i < length; i++) {
                        rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                        position = rmb.offset
                        repeatPattern = rmb.altPattern
                        alt_offset = rmb.altOffset
                        alt_length = rmb.altLength
                    }
                    ste.obsolete_event = true
                } else if (sub_type == 0x7F) { // Unused Sequencer Specific Event
                    ste.type = 0xFF
                    gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
                    position = gvlb.offset
                    original = gvlb.original
                    repeatPattern = gvlb.alt_pattern
                    alt_offset = gvlb.alt_offset
                    alt_length = gvlb.alt_length
                    length = gvlb.vlength
                    for (let i = 0; i < length; i++) {
                        rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                        position = rmb.offset
                        repeatPattern = rmb.altPattern
                        alt_offset = rmb.altOffset
                        alt_length = rmb.altLength
                    }
                    ste.obsolete_event = true
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0x80, 0x90, status_bit)) {
                current_event_value = previous_event_value
                note_number = eventVal
                ste.type = previous_event_value
                if (!status_bit) {
                    ste.type = eventVal
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    note_number = rmb.returnByte
                    current_event_value = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                velocity = rmb.returnByte
                for (test_backwards = track_event_count[trackNum] - 1; test_backwards >= 0; test_backwards--) {
                    tbte = track_events[trackNum][test_backwards];
                    if ((tbte.type == 0x90 + (current_event_value % 0x10)) && (!tbte.obsolete_event)) {
                        if (tbte.contents[0] == note_number) {
                            tbte.duration_time = abs_time - tbte.abs_time
                            break
                        }
                    }
                }
                ste.duration_time = 0
                ste.content_size = 2
                ste.contents = [note_number, velocity]
                ste.obsolete_event = true
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0x90, 0xA0, status_bit)) {
                current_event_value = previous_event_value
                note_number = eventVal
                ste.type = previous_event_value
                if (!status_bit) {
                    ste.type = eventVal
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    note_number = rmb.returnByte
                    current_event_value = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                velocity = rmb.returnByte
                if (velocity == 0) { // simulate note off
                    for (test_backwards = track_event_count[trackNum] - 1; test_backwards >= 0; test_backwards--) {
                        tbte = track_events[trackNum][test_backwards];
                        if (tbte.type == current_event_value && (!tbte.obsolete_event)) {
                            if (tbte.contents[0] == note_number) {
                                tbte.duration_time = abs_time - tbte.abs_time
                                break
                            }
                        }
                    }
                    ste.duration_time = 0
                    ste.content_size = 2
                    ste.contents = [note_number, velocity]
                    ste.obsolete_event = true
                } else {
                    // Check if no note off received, if so, turn it off and restart note
                    for (test_backwards = track_event_count[trackNum] - 1; test_backwards >= 0; test_backwards--) {
                        tbte = track_events[trackNum][test_backwards]
                        if (tbte.type == current_event_value && (!tbte.obsolete_event)) {
                            if (tbte.contents[0] == note_number) {
                                if (tbte.duration_time == 0) { // Means unfinished note
                                    tbte.duration_time = abs_time - tbte.abs_time
                                }
                                break
                            }
                        }
                    }
                    ste.duration_time = 0
                    ste.content_size = 2
                    ste.contents = [note_number, velocity]
                }
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xB0, 0xC0, status_bit)) { // Controller change
                controller_type = eventVal
                ste.type = previous_event_value
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    controller_type = rmb.returnByte
                    ste.type = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                controller_value = rmb.returnByte
                ste.content_size = 2
                ste.contents = [controller_type, controller_value]
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xC0, 0xD0, status_bit)) { // Change instrument
                instrument = eventVal
                ste.type = previous_event_value
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    instrument = rmb.returnByte
                    ste.type = eventVal
                }
                if ((eventVal % 0x10) == 9) { // Drums in GM
                    instrument = instrument
                } else {
                    instrument = instrument
                }
                ste.content_size = 1
                ste.contents = [instrument]
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xD0, 0xE0, status_bit)) { // Channel aftertouch
                ste.type = previous_event_value
                amount = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    amount = rmb.returnByte
                    ste.type = eventVal
                }
                ste.content_size = 1
                ste.contents = [amount]
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if (eventInBounds(eventVal, previous_event_value, 0xE0, 0xF0, status_bit)) { // Pitch Bend
                ste.type = previous_event_value
                value_lsb = eventVal
                if (!status_bit) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                    value_lsb = rmb.returnByte
                    ste.type = eventVal
                }
                rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                position = rmb.offset
                repeatPattern = rmb.altPattern
                alt_offset = rmb.altOffset
                alt_length = rmb.altLength
                value_msb = rmb.returnByte
                ste.content_size = 2
                ste.contents = [value_lsb, value_msb]
                if (!status_bit) {
                    previous_event_value = eventVal
                }
            } else if ([0xF0,0xF7].includes(eventVal)) {
                ste.type = eventVal
                gvlb = GetVLBytes(temp, position, original, repeatPattern, alt_offset, alt_length, false)
                position = gvlb.offset
                original = gvlb.original
                repeatPattern = gvlb.alt_pattern
                alt_offset = gvlb.alt_offset
                alt_length = gvlb.alt_length
                length = gvlb.vlength
                for (let i = 0; i < length; i++) {
                    rmb = ReadMidiByte(temp, position, repeatPattern, alt_offset, alt_length, false)
                    position = rmb.offset
                    repeatPattern = rmb.altPattern
                    alt_offset = rmb.altOffset
                    alt_length = rmb.altLength
                }
                ste.obsolete_event = true
            } else {
                if (!unknown_var) {
                    unknown_var = true
                    throw new Error("Invalid Midi Character found")
                }
            }
            track_event_count[trackNum] += 1
        }
    }
    time_offset = 0
    start_position = 0x44
    // Write Headers
    for (let i = 0; i < numberTracks; i++) {
        size_data = 0
        loop_start_position = 0
        found_loop_start = false
        previous_track_event = 0x0
        if (track_event_count[i] > 0) {
            attempt.writeNum(start_position, 4)
            for (let j = 0; j < track_event_count[i]; j++) {
                track_event = track_events[i][j]
                length_time_delta = 0
                rvlb = ReturnVLBytes(track_event.delta_time + time_offset, length_time_delta)
                length_time_delta = rvlb.lngth
                time_delta = rvlb.newValue
                if (track_event.obsolete_event) {
                    time_offset += track_event.delta_time
                } else {
                    if ((track_event.type == 0xFF) && (track_event.contents[0] == 0x2E)) {
                        found_loop_start = true
                        loop_start_position = start_position + size_data + 1 + track_event.content_size + length_time_delta
                    }
                    time_offset = 0
                    size_data += length_time_delta
                    if ((track_event.type == 0xFF) && (track_event.contents[0] == 0x2D)) {
                        offset_back = (start_position + size_data) - loop_start_position + 8
                        track_event.contents[3] = (offset_back >> 24) & 0xFF
                        track_event.contents[4] = (offset_back >> 16) & 0xFF
                        track_event.contents[5] = (offset_back >> 8) & 0xFF
                        track_event.contents[6] = (offset_back >> 0) & 0xFF
                    }
                    if ((track_event.type != previous_track_event) || (track_event.type == 0xFF)) {
                        size_data += 1
                    }
                    size_data += track_event.content_size
                    if ((track_event.type >= 0x90) && (track_event.type < 0xA0)) {
                        length_duration_bytes = 0
                        rvlb = ReturnVLBytes(track_event.duration_time, length_duration_bytes)
                        length_duration_bytes = rvlb.lngth
                        duration = rvlb.newValue
                        size_data += length_duration_bytes
                    }
                    previous_track_event = track_event.type
                }
            }
            start_position += size_data
        } else {
            attempt.writeNum(0, 4)
        }
    }
    // Write remaining parts of header
    i = numberTracks
    while (i < TRACK_LIMIT_SMALL) {
        attempt.writeNum(0, 4)
        i += 1
    }
    attempt.writeNum(tempo, 4)
    for (let i = 0; i < numberTracks; i++) {
        // Write track data
        if (track_event_count[i] > 0) {
            previous_track_event = 0
            for (let j = 0; j < track_event_count[i]; j++) {
                track_event = track_events[i][j]
                if (track_event.obsolete_event) {
                    time_offset += track_event.delta_time
                } else {
                    length_time_delta = 0
                    rvlb = ReturnVLBytes(track_event.delta_time + time_offset, length_time_delta)
                    length_time_delta = rvlb.lngth
                    time_delta = rvlb.newValue
                    time_offset = 0
                    WriteVLBytes(attempt, time_delta, length_time_delta, false)
                    if ((track_event.type != previous_track_event) || (track_event.type == 0xFF)) {
                        attempt.writeNum(track_event.type, 1)
                    }
                    if (track_event.contents != null) {
                        attempt.writeBytes(track_event.contents)
                    }
                    if ((track_event.type >= 0x90) && (track_event.type < 0xA0)) {
                        length_duration_bytes = 0
                        rvlb = ReturnVLBytes(track_event.duration_time, length_duration_bytes)
                        length_duration_bytes = rvlb.lngth
                        duration = rvlb.newValue
                        WriteVLBytes(attempt, duration, length_duration_bytes, false)
                    }
                    previous_track_event = track_event.type
                }
            }
        }
        for (let j = 0; j < track_event_count[i]; j++) {
            track_events[i][j].contents = null
        }
    }
    out_data = attempt.data
    size_out = out_data.length
    temp.wipe(out_data)
    offset_header = Array(TRACK_LIMIT_SMALL).fill(null)
    extra_offsets = Array(TRACK_LIMIT_SMALL).fill(0)
    for (let i = 0; i < TRACK_LIMIT_SMALL; i++) {
        offset_header[i] = temp.readNum(4)
    }
    for (let x = 0; x < size_out; x++) {
        if (x > 0x44) {
            temp.seek(x)
            if (temp.readNum(1) == 0xFE) {
                for (let y = 0; y < numberTracks; y++) {
                    if (offset_header[y] > x) {
                        extra_offsets[y] += 1
                    }
                }
            }
        }
    }
    attempt.wipe()
    for (let x = 0; x < TRACK_LIMIT_SMALL; x++) {
        WriteLongToBuffer(temp, x*4, offset_header[x] + extra_offsets[x])
    }
    for (let x = 0 ; x < size_out; x++) {
        temp.seek(x)
        val = temp.readNum(1)
        attempt.writeNum(val, 1)
        if (x > 0x44) {
            if (val == 0xFE) {
                attempt.writeNum(val, 1)
            }
        }
    }
    if (no_repeaters) {
        in_data = attempt.data
        size_in = in_data.length
        temp.wipe(in_data)
        offset = Array(TRACK_LIMIT_SMALL).fill(null)
        for (let x = 0; x < TRACK_LIMIT_SMALL; x++) {
            offset[x] = temp.readNum(4)
        }
        quarter_note = temp.readNum(4)
        out_array = Array(4 * size_in).fill(0)
        offset_new = Array(TRACK_LIMIT_SMALL).fill(0)
        output_spot = 0x44
        for (let x = 0; x < TRACK_LIMIT_SMALL; x++) {
            if (offset[x] != 0) {
                offset_new[x] = output_spot
                output_start = output_spot
                end_spot = size_in
                if (x < 0xF) {
                    if (offset[x+1] != 0) {
                        end_spot = offset[x+1]
                    }
                }
                for (y = offset[x]; y < end_spot; y++) {
                    best_match_offset = -1
                    best_match_loop_count = -1
                    for (z = output_start; z < output_spot; z++) {
                        match = 0
                        match_offset = 0
                        for (match_offset = 0; z + match_offset < output_spot; match_offset++) {
                            temp.seek(y+match_offset)
                            if (out_array[z+match_offset] != temp.readNum(1)) {
                                break
                            }
                            if ((y + match_offset) >= end_spot) {
                                break
                            }
                            if ([0xFE, 0xFF].includes(out_array[z+match_offset])) {
                                break
                            }
                            seeAnFF = false
                            checkFF = y+match_offset
                            while ((checkFF < end_spot) && (checkFF < (y+match_offset + 5))) {
                                temp.seek(checkFF)
                                seeAnFF |= (temp.readNum(1) == 0xFF);
                                checkFF += 1
                            }
                            if (seeAnFF) {
                                break
                            }
                        }
                        if ((match_offset > best_match_loop_count) && (match_offset > 6)) {
                            best_match_loop_count = match_offset
                            best_match_offset = z
                        }
                    }
                    loop_check = Math.floor((y - offset[x]) / 2)
                    if (loop_check > 0xFD) {
                        loop_check = 0xFD
                    }
                    if (best_match_loop_count > 6) {
                        if (best_match_loop_count > 0xFD) {
                            best_match_loop_count = 0xFD
                        }
                        out_array[output_spot] = 0xFE
                        output_spot += 1
                        dist_back = (output_spot - best_match_offset) - 1
                        out_array[output_spot] = (dist_back >> 8) & 0xFF
                        out_array[output_spot + 1] = dist_back & 0xFF
                        out_array[output_spot + 2] = best_match_loop_count
                        output_spot += 3
                        y += (best_match_loop_count - 1)
                    } else {
                        temp.seek(y)
                        out_array[output_spot] = temp.readNum(1)
                        output_spot += 1
                    }
                }
            } else {
                break;
            }
            if ((output_spot % 4) != 0) {
                output_spot += (4 - (output_spot % 4))
            }
        }
        for (let x = 0; x < TRACK_LIMIT_SMALL; x++) {
            if (offset_new[x] != 0) {
                output_start = offset_new[x]
                end_spot = output_spot
                if (x < 0xF) {
                    if (offset_new[x+1] != 0) {
                        end_spot = offset_new[x+1]
                    }
                }
                found_start = false
                start_pos = 0
                for (y = offset_new[x]; y < end_spot; y++) {
                    if ((out_array[y] == 0xFF) && (out_array[y+1] == 0x2E) && (out_array[y+2] == 0) && (out_array[y+3] == 0xFF)) {
                        found_start = true
                        start_pos = y + 4
                        y += 3
                    } else if ((out_array[y] == 0xFF) && (out_array[y+1] == 0x2d) && (out_array[y+2] == 0xFF) && (out_array[y+3] == 0xFF)) {
                        if (found_start) {
                            distance = (y + 8) - start_pos
                            WriteLongToBuffer(out_array, y+4, distance)
                            found_start = false
                        }
                        y += 7
                    }
                }
            }
        }
        for (let x = 0; x < TRACK_LIMIT_SMALL; x++) {
            WriteLongToBuffer(out_array, x*4, offset_new[x])
        }
        WriteLongToBuffer(out_array, 0x40, quarter_note)
        attempt.wipe()
        for (let x = 0; x < output_spot; x++) {
            attempt.writeNum(out_array[x], 1)
        }
    }
    return attempt.data.slice()
}

function writeToFile(new_file, file_name) {
    var write_bytes = new Uint8Array(new_file.length);
    new_file.forEach((item,index) => {write_bytes[index] = item})
    var saveByteArray = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display:none";
        return function (data, name) {
            var blob = new Blob(data, {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            a.remove();
        };
    }())
    saveByteArray([write_bytes],file_name)
}

function finishPreload(z64_data) {
    rom_f = new BufferFile(z64_data);
    rom_f.seek(POINTER_TABLE_OFFSET)
    const midi_table = POINTER_TABLE_OFFSET + (rom_f.readNum(4) & 0x7FFFFFFF);
    let song_data = [];
    for (let s = 0; s < 175; s++) {
        rom_f.seek(midi_table + (s * 4));
        const f_start = POINTER_TABLE_OFFSET + (rom_f.readNum(4) & 0x7FFFFFFF);
        const f_finish = POINTER_TABLE_OFFSET + (rom_f.readNum(4) & 0x7FFFFFFF);
        const f_size = f_finish - f_start;
        song_data.push(f_size);
    }
    return {
        "song_data": song_data.slice(),
    }
}

function writeToROMInternal(rom_array, slot, compressed_midi) {
    rom_f = new BufferFile(rom_array);
    rom_f.seek(POINTER_TABLE_OFFSET)
    const midi_table = POINTER_TABLE_OFFSET + (rom_f.readNum(4) & 0x7FFFFFFF);
    rom_f.seek(midi_table + (slot * 4))
    const f_start = POINTER_TABLE_OFFSET + (rom_f.readNum(4) & 0x7FFFFFFF);
    rom_f.seek(f_start)
    rom_f.writeBytes(compressed_midi, compressed_midi.length);
    return rom_f.data.slice();
}

async function readMidiPorting(data) {
    let midi_f = new BufferFile(data)
    let selected_template = null;
    const settings = document.getElementById("template_select").getElementsByTagName("input")
    for (let s = 0; s < settings.length; s++) {
        if (settings[s].checked) {
            selected_template = settings[s].getAttribute("template-file")
        }
    }
    if (selected_template) {
        await fetch(`./data/midi_conversions/${selected_template}`)
            .then(response => response.json())
            .then(json => {
                const ins_keys = Object.keys(json)
                instrument_change_addresses.forEach(addr => {
                    midi_f.seek(addr)
                    const old_instrument = midi_f.readNum(1) + 1;
                    if (ins_keys.includes(old_instrument.toString())) {
                        const new_ins = json[old_instrument]["new_instrument"];
                        if (new_ins >= -1) {
                            midi_f.seek(addr)
                            console.log(old_instrument - 1, "->", new_ins - 1);
                            midi_f.writeNum(new_ins - 1, 1);
                        }
                    }
                })
                if (midi_f.data.length > 0) {
                    const name = last(document.getElementById("file-selector").value.split("\\"));
                    writeToFile(midi_f.data, `CONVERTED_${name}`)
                }
            });
    }
}