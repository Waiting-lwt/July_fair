export const formatDate = (date,type=5) => {
	//格式化日期
	let d = new Date(date)
	let month = '' + (d.getMonth() + 1)
	let day = '' + d.getDate()
	let year = d.getFullYear()
	let hour = d.getHours();
	let minute = d.getMinutes()
	let second = d.getSeconds()
	if(parseInt(minute) < 10) minute = "0" + minute;
	if(type==3){
		return year + '年' + month + "月" + day + "日 "
	}
	return year + '年' + month + "月" + day + "日 "+ hour + ":" + minute
}

export const formatTime = (date) => {
	//格式化时间
	let d = new Date(date)
	let day = '' + d.getDate()
	let hour = d.getHours();
	let minute = d.getMinutes()
	let second = d.getSeconds()
	if(parseInt(minute) < 10) minute = "0" + minute;
	return  day + "天"+ hour + "小时"
}