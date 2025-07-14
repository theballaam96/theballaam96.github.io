class OldMIDIInfo {
    constructor (drive_id, audio, converter, timestamp) {
        this.converter = converter;
        this.drive_id = drive_id;
        this.audio = audio;
        this.timestamp = timestamp;
    }
}

class MIDIInfo {
    constructor (name, game, group, composer, converter, drive_id, timestamp, audio, midi_length, track_count, tags, notes, short_name, index) {
        this.name = name;
        this.short_name = short_name;
        this.game = game;
        this.group = group;
        this.composer = composer;
        this.converter = converter;
        this.drive_id = drive_id;
        this.timestamp = timestamp;
        this.initial_timestamp = timestamp;
        this.audio = audio;
        this.index = index;
        this.midi_length = midi_length ? parseFloat(midi_length) : null;
        this.track_count = track_count
        this.tags = []
        this.delisted = false
        if (tags != null) {
            this.tags = tags;
            if (typeof tags == "string") {
                this.tags = tags.split(",").map(item => item.trim());
            }
            this.delisted = this.tags.includes(DELISTED_TAG)
            this.tags = this.tags.filter(item => item != DELISTED_TAG);
        }
        this.notes = notes
        this.days_since_submission = null;
        this.is_new = false;
        this.older_revisions = null;
        if (timestamp != null) {
            const current_dt = new Date();
            const timestamp_dt = new Date(timestamp);
            const diff_dt = current_dt - timestamp_dt;
            this.days_since_submission = Math.floor(diff_dt / (1000 * 60 * 60 * 24));
            this.is_new = this.days_since_submission < 7;
        }
        if (!this.delisted) {
            this.changelog_entry = window.pushToRecent(this.game, this.name, this.days_since_submission)
        }
    }

    update_entry(replacement) {
        if (this.older_revisions == null) {
            this.older_revisions = [];
        }
        this.older_revisions.push(new OldMIDIInfo(
            this.drive_id,
            this.audio,
            this.converter,
            this.timestamp,
        ))
        let converter_list = this.converter.split(",").map(item => item.trim());
        replacement.converter.split(",").map(item => item.trim()).forEach(item => {
            if (!converter_list.includes(item)) {
                converter_list.push(item);
            }
        })
        this.converter = converter_list.join(", ");
        this.drive_id = replacement.drive_id;
        this.audio = replacement.audio ? replacement.audio : this.audio;
        this.midi_length = replacement.midi_length ? replacement.midi_length : this.midi_length;
        this.track_count = replacement.track_count ? replacement.track_count : this.track_count;
        if ((replacement.tags != null) && (replacement.tags.length > 0)) {
            this.tags = replacement.tags.slice();
        }
        this.notes = replacement.notes ? replacement.notes : this.notes;
        this.timestamp = replacement.timestamp;
        if (this.initial_timestamp == null) {
            this.initial_timestamp = this.timestamp;
        }
        this.days_since_submission = replacement.days_since_submission;
        this.is_new = replacement.is_new;
        this.short_name = replacement.short_name;
    }
}