import prisma from "@/utils/prisma";

export default async function FilesList() {
    const files = await prisma.file.findMany()

    return (
        <div className="w-4xl m-auto">
        <h1>all files</h1>
        <div>{files.map((file) => (
            <div key={file.id}>{file.name}</div>
        ))}</div>
        </div>
    )
}
