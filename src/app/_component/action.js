export default async function uploadFileAction(formData) {
const file = formData.get("file")

console.log(file)
}