

import  UploadCSV  from "@/components/UploadCSV";


import  DownloadCSV  from "@/components/DownloadCSV";


export default function Dashboard() {
    return (
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Dashboard</h1>
        <UploadCSV />

        <DownloadCSV />
      </div>
    );
  }