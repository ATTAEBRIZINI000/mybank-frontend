const currentDate = new Date();
const day = currentDate.getDate();
const monthName = currentDate.toLocaleString('default', { month: 'long' });
const year = currentDate.getFullYear();
const formattedDate = `${day} . ${monthName} . ${year}`;
export default formattedDate;