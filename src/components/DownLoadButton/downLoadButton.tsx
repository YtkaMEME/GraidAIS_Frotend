import React from 'react';

const DownloadButton = ({link_url, allFilters, selectedCheckboxes, setLoading}) => {
    async function handleDownload(){
        setLoading(true);
        await fetch(`${link_url}/api/send_excel/people`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({allFilters, selectedCheckboxes})
        }).then(response => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('Network response was not ok.');
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'output.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('There was an error downloading the file:', error))
            .finally(() => setLoading(false));
    };

    return (
        <button onClick={handleDownload} className="btn btn-primary">
            Скачать Excel файл
        </button>
    );
};

export default DownloadButton;
