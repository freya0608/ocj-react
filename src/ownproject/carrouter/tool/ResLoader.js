/**
 * Created by admin on 2018/11/13.
 */
//{width:img.width,height:img.height,img:img}
class Singleton {
	static instance;
	constructor(){
		if(Singleton.instance){
			return Singleton.instance;
		}
		this.instance = this;
		this.version="0";
		this.directory={}
	}
	get(url){
		let promise=new Promise((resolve,reject)=>{
			if(this.directory[url+"?"+this.version]){
				resolve(this.directory[url+"?"+this.version]);
			}else{
				let img=new window.Image()
				img.onload=()=>{
					let imgs={width:img.width,height:img.height,img:img}
					this.directory[url+"?"+this.version]=imgs;
					resolve(imgs);
				}
				img.onerror=(error)=>{
					reject(error);
				}
				img.src=url+"?"+this.version
			}
		});
		return promise;
	}
	load(array,updata,version="0"){
		this.version=version;
		let loaded=0;
		let sequence = Promise.resolve()
		array.forEach((item)=>{
			sequence = sequence.then(()=>{
				if(!this.directory[item+"?"+this.version]){
					let promise=new Promise((resolve,reject)=>{
						let img=new window.Image()
						img.onload=()=>{
							let imgs={width:img.width,height:img.height,img:img}
							this.directory[item+"?"+this.version]=imgs;
							loaded++;
							updata&&updata(Math.floor(loaded/array.length*100))
							resolve();
						}
						img.onerror=(error)=>{
							loaded++;
							updata&&updata(Math.floor(loaded/array.length*100))
							resolve();
						}
						img.src=item+"?"+this.version
					})
					return promise
				}else {
					loaded++;
					updata&&updata(Math.floor(loaded/array.length*100))
				}
			})
		})
		return sequence
	}
}
const resSingleton=new Singleton();
export {resSingleton}
