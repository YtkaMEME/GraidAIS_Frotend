import React, { useState } from 'react';
import styles from '../../styles/FileDropZone.module.css';
import style from "../../styles/NavBar.module.css";

interface FileWithPreview {
    file: File;
    preview: string;
}

const FileDropZone = ({ link_url }) => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [updateMode, setUpdateMode] = useState<string>('True');
    const [loading, setLoading] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

    const get_date = async () => {
        const res = await fetch(`${link_url}/api/get_last_update`);
        let response = await res.json();
        setLastUpdated(response);
    };
    get_date()

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);

        const validFiles = droppedFiles.filter((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (fileExtension !== 'csv' && fileExtension !== 'xlsx' && fileExtension !== 'zip') {
                alert(`Файл ${file.name} имеет неподдерживаемое расширение.`);
                return false;
            }
            return true;
        }).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter((f) => f.file !== fileToRemove));
    };

    const truncateFileName = (name: string, maxLength: number) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdateMode(event.target.value); // Обновляем значение
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            alert("Нет файлов для отправки");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        files.forEach((fileWithPreview, index) => {
            const fileExtension = fileWithPreview.file.name.split('.').pop();
            const newFileName = `${index + 1}.${fileExtension}`;
            formData.append('files', new File([fileWithPreview.file], newFileName, { type: fileWithPreview.file.type }));
        });

        formData.append('updateMode', updateMode);

        try {
            const response = await fetch(`${link_url}/api/upload_files`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert(`База успешно обновлена`);
                setFiles([]);
            } else {
                alert('Ошибка при отправке файлов');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка при подключении к серверу');
        } finally {
            setLoading(false); // выключаем загрузку
        }
    };

    return (
        <>
            {loading && (
                <div className={styles.loadingOverlay}>
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border" role="status"
                             style={{width: '5rem', height: '5rem', color: 'white'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            <div className={`${styles.dateUpdateContainer} container mt-3 d-flex py-3 mb-4 border-bottom`}>
                <span className={styles.dateLabel}>Дата последнего обновления базы данных: </span>
                <span className={styles.date}>{lastUpdated}</span>
            </div>
            <div className={styles.dropZone}
                 onDrop={handleDrop}
                 onDragOver={handleDragOver}>

                {files.length === 0 && (<p>Перетащите файлы сюда</p>)}
                {files.length > 0 && (
                    <div className={`${styles.fileList} ${style.head}`}>
                        {files.map((fileWithPreview, index) => (
                            <div key={index} className={styles.fileItem}>
                                <img
                                    src={fileWithPreview.preview}
                                    alt={fileWithPreview.file.name}
                                    className={styles.fileIcon}
                                />
                                <p className={styles.fileName}>
                                    {truncateFileName(fileWithPreview.file.name, 15)}
                                </p>
                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeFile(fileWithPreview.file)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="container d-flex flex-row-reverse mt-3">
                <div className="col-me-5">
                    <select className="form-select" id="country"
                            value={updateMode}
                            onChange={handleSelectChange}
                    >
                        <option value="True">Обновить данные полностью</option>
                        <option value="False">Дополнить существующие</option>
                    </select>
                    <div className="invalid-feedback">
                        Выберите способ обновления
                    </div>
                </div>
                <button className="btn btn-primary me-2" onClick={handleUpload}>Обновить базу данных</button>
            </div>
        </>
    );
};

export default FileDropZone;
