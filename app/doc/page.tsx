

export default function DocPage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Document Access</h1>
            <div className="flex gap-4">
                <a
                    href="https://kfupmedusa-my.sharepoint.com/:p:/g/personal/s202024100_kfupm_edu_sa/IQC3XBLCnzX8RKGYHi8svQHYAVZ1xwZ6SEYYietRrd76wmE?e=qPftgz"
                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                    Open Link
                </a>
                <a
                    href="/1.pptx"
                    download
                    className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                    Download Presintation
                </a>
            </div>
        </div>
    );
}
