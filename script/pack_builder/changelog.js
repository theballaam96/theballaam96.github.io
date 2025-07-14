let recent_history = {}
const timeframe_names = ["This week", "Last Week", "2 weeks ago", "3 weeks ago", "Last Month", "Older"];
const timeframe_limit = [7, 14, 21, 28, 60, 999999];

function updateRecent() {
    Object.keys(recent_history).forEach(key => {
        recent_history[key].sort()
        recent_history[key].reverse()
    })
    const displayable_names = timeframe_names.filter((item, index) => index < timeframe_names.length - 1);
    document.getElementById("popup_recent").innerHTML = `
        ${displayable_names.map(frame => `${!Object.keys(recent_history).includes(frame) ? "" : `
            <div class="flexsplitter">
                <div class="popup_subtitle" style="flex:1">${frame}</div>
                <div style="flex:1; text-align:right">
                    <button style="width:fit-content; width:-moz-fit-content" class="btn btn-outline-primary btn-sm" type="button" data-bs-toggle='collapse' href='#collapse-${frame.replaceAll(" ","")}' role="button" aria-expanded="false" aria-controls="collapse-${frame.replaceAll(" ","")}" onclick="toggleShowName(this)">
                        Show
                    </button>
                </div>
            </div>
            <div class="collapse multi-collapse" id="collapse-${frame.replaceAll(" ","")}">
                <ul>${recent_history[frame].map(song => `
                    <li>${song.is_update ? "[UPDATE] " : ""}
                    ${song.game}: ${song.song}</li>
                `).join("")}</ul>
            </div>
        `}`).join("")}
    `
}
window.updateRecent = updateRecent;

function updateChangelogEntry(entry_index, time_ago, new_data) {
    if ((time_ago != null) && (entry_index != null)) {
        const time_name = getTimeframeName(time_ago);
        if (Object.keys(recent_history).includes(time_name)) {
            Object.keys(new_data).forEach(key => {
                recent_history[time_name][entry_index][key] = new_data[key]
            })
        }
    }
}

function getTimeframeName(time_ago) {
    if (time_ago != null) {
        let time_name = window.last(timeframe_names);
        timeframe_limit.forEach((lim, index) => {
            if ((time_name == window.last(timeframe_names)) && (time_ago < lim)) {
                time_name = timeframe_names[index]
            }
        })
        return time_name
    }
    return window.last(timeframe_names);
}

function pushToRecent(game, song, time_ago) {
    if (time_ago != null) {
        const time_name = getTimeframeName(time_ago)
        if (!Object.keys(recent_history).includes(time_name)) {
            recent_history[time_name] = []
        }
        is_update = midi_data_copy.filter(item => (item.name == song) && (item.game == game)).length > 0
        recent_history[time_name].push({
            "game": game,
            "song": song,
            "is_update": is_update,
            "days_ago": time_ago
        })
        return recent_history[time_name].length - 1;
    }
    return null;
}
window.pushToRecent = pushToRecent;