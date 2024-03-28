import moment from "moment";

const fileFormate = (url) => {
    const fileExt = url.split('.').pop();
    if (fileExt == 'mp4' || fileExt == 'webm' || fileExt == 'ogg')
        return "video"

    if (fileExt == 'mp3' || fileExt == 'mav')
        return "audio"

    if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif')
        return "image"

    return "file"
}

const transformImage = (url = "", width = 100) => url

export const getLastDays = () => {
    const currentDate = moment()

    const last7Days = [];

    for (let i = 0; i < 7; i++)
    {
        // for last 7 dates

        // last7Days.unshift(currentDate.format('MMM D'))
        // currentDate.subtract(1,"days")

        // for last 7 day

        const dayDate = currentDate.clone().subtract(i,"days");
        const dayName = dayDate.format("dddd")
        last7Days.unshift(dayName)
    }
    return last7Days
}

export { fileFormate, transformImage };