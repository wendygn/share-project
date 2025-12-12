;
import { Header } from "./_component/header";
import { Uploader } from "./_component/upload";
import FilesList from "./_component/files-list";


export default function Home() {


  return (
    <div>
      <Header />
      <div className="w-4xl m-auto mt-8">
        <h1 className="text-3xl font-bold text-blue-500 ">Share Files Efforlessly</h1>
        <p className="mb-5 font-medium text-gray-500">upload your files and get instant shareable links</p>
      </div>
      <Uploader />
  
    </div>
  );
}

