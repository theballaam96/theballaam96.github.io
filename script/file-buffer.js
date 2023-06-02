class BufferFile {
    constructor(data) {
        this.data = data
        this.read_header = 0
    }

    wipe(data = []) {
        this.data = data
        this.read_header = 0
    }

    seek(point) {
        this.read_header = point
    }

    readBytes(size) {
        let arr = []
        for (let i = 0; i < size; i++) {
            arr.push(this.data[this.read_header + i])
        }
        this.read_header += size
        return arr.slice()
    }

    readNum(size) {
        let amt = 0;
        const arr = this.readBytes(size)
        for (let i = 0; i < size; i++) {
            amt *= 256
            amt += arr[i]
        }
        return amt
    }

    writeBytes(arr, size) {
        arr.forEach((a, index) => {
            let address = this.read_header + index
            if (this.data.length >= address) {
                this.data[address] = a
            } else {
                let diff = address - this.data.length
                for (let d = 0; d < diff; d++) {
                    this.data.push(0)
                }
                this.data.push(a)
            }
        })
        this.read_header += size
    }

    writeNum(value, size) {
        let running_value = value;
        if (size > 0) {
            let arr = Array(size).fill(0)
            for (let i = 0; i < size; i++) {
                arr[i] = running_value & 0xFF
                running_value >>= 8
            }
            this.writeBytes(arr.reverse(), size)
        }
    }
}