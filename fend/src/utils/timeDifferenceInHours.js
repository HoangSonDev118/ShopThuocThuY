export function timeDifferenceInHours(dateString) {
    const pastDate = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
    const currentDate = new Date(); // Thời gian hiện tại

    const differenceInMilliseconds = currentDate - pastDate; // Tính sự khác biệt thời gian
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60)); // Chuyển đổi từ mili giây sang phút
    const differenceInHours = Math.floor(differenceInMinutes / 60); // Chuyển đổi từ phút sang giờ
    const differenceInDays = Math.floor(differenceInHours / 24); // Chuyển đổi từ giờ sang ngày

    if (differenceInMinutes < 60) {
        return `${differenceInMinutes} phút trước`;
    } else if (differenceInHours < 24) {
        return `${differenceInHours} giờ trước`;
    } else {
        return `${differenceInDays} ngày trước`;
    }
}