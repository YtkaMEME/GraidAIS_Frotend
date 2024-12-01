import React, { useState } from 'react';
import styles from '../../styles/FileDropZone.module.css';
import style from "../../styles/NavBar.module.css";

interface FileWithPreview {
    file: File;
    preview: string;
}

const FileDropZone: React.FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [updateMode, setUpdateMode] = useState<string>('True');

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);

        const validFiles = droppedFiles.filter((file) => {
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
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

        const formData = new FormData();
        files.forEach((fileWithPreview, index) => {
            // Переименовываем файл в номер с сохранением расширения
            const fileExtension = fileWithPreview.file.name.split('.').pop();
            const newFileName = `${index + 1}.${fileExtension}`;
            formData.append('files', new File([fileWithPreview.file], newFileName, { type: fileWithPreview.file.type }));
        });

        formData.append('updateMode', updateMode);

        try {
            const response = await fetch('http://185.198.152.26/api/upload_files', {
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
        }
    };

    return (
        <>

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
