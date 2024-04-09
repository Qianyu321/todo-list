import Dexie from "dexie"; 
import { useLiveQuery } from "dexie-react-hooks"; 
export const db = new Dexie("todo-photos"); 

db.version(1).stores({ // 表格“photos”将包含just和id属性。
 photos: "id", 
});
async function addPhoto(id, imgSrc) { // 保存照片，id将作为prop传递
 console.log("addPhoto", imgSrc.length, id);
 try {
    const i = await db.photos.add({
        id: id, // 创建并存储一个具有索引 id 的对象
        imgSrc: imgSrc, // and image (data URL string in base64)
        });
        console.log(`Photo ${imgSrc.length} bytes successfully added. Got id ${i}`);
        } catch (error) {
        console.log(`Failed to add photo: ${error}`);
        }
        return (
        <>
        <p>
        {imgSrc.length} &nbsp; | &nbsp; {id}
        </p>
        </>
        );
       }
       function GetPhotoSrc(id) {
        console.log("getPhotoSrc", id);
        const img = useLiveQuery(() => db.photos.where("id").equals(id).toArray());
        console.table(img);
        if (Array.isArray(img)) return img[0].imgSrc; //返回图像数据字符串
       } // 通过id识别。   修改加分

       export { addPhoto, GetPhotoSrc };