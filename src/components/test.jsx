const showDetailHandler = (id) => {
        const fileObj = fakeData.find((file) => file.id === id);
        setSelectedFile(fileObj);
        setSelectedInnerFile(true);
    };

     const handleInnerFileClick = (innerFile) => {
        setSelectedInnerFile(innerFile);
        selectedScanDetail(true);
    };

     return (
        <AppLayout pageTitle={t("Scan Result")} breadcrumbs={breadcrumbsItems}>
            {showModal && (
                <Modal
                    title={modalHeader}
                    modalClose={onModalCloseHandler}
                    size="large"
                >
                    <div className={classes["modal-content"]}>
                        {modalContent === "forward" && forwardFiles}
                        <div className={classes["modal-actions"]}></div>
                    </div>
                </Modal>
            )}
            <div className={classes["wrapper"]}>
                <div className={classes["container-header"]}>
                    <div
                        className={`flex mb-6 ${classes["row"]}`}
                        style={{ justifyContent: "center" }}
                    >
                        <p
                            className={`rounded-2xl max-w-max px-2.5 py-1 self-center ${classes["title"]}`}
                        >
                            {t("scanInfo")}
                        </p>
                    </div>
                    <SummaryFilesInfo
                        scanStatus={scanStatus}
                        files_all_scan_count={info?.files_all_scan_count}
                        files_inprogress_scan_count={
                            info?.files_inprogress_scan_count
                        }
                        files_malware_scan_count={
                            info?.files_malware_scan_count
                        }
                        files_benign_scan_count={info?.files_benign_scan_count}
                    />
                </div>
                <div className={`${classes["wrapper-content"]}`}>
                    <div className={classes["wrapper-content-row"]}>
                        <div
                            className={`${
                                selectedInnerFile
                                    ? classes["container-content"]
                                    : classes["container-content-full"]
                            }`}
                        >
                            <div className={`flex m-0 pb-0 ${classes["row"]}`}>
                                <div className="flex w-full justify-center">
                                    <p
                                        className={`rounded-2xl max-w-max px-2.5 m-0 ${
                                            selectedInnerFile
                                                ? "self-start"
                                                : "self-center"
                                        } ${classes["title"]}`}
                                    >
                                        {t("scannedFiles")}
                                    </p>
                                </div>
                            </div>
                            {console.log(selectedInnerFile)}
                            {!selectedInnerFile && (
                                <Card>
                                    <TableCustom
                                        indexing="true"
                                        headers={[
                                            t("File Name"),
                                            t("Scan ID"),
                                            t("File Size"),
                                            t("File Scan Date"),
                                            t("File Scan Status"),
                                            t("Detection status"),
                                            t("Details"),
                                        ]}
                                        subtitle={t("ClickForDetails")}
                                        data={fakeData}
                                        showDetail={showDetailHandler}
                                        selectedRows={(rows) =>
                                            setSelectedFiles(rows)
                                        }
                                        isDetailOpen={!!selectedFile}
                                    />
                                </Card>
                            )}

                            {(selectedScanDetail || selectedInnerFile) && (
                                <>
                                    <Card className="mt-4">
                                        <h4 className="px-4 pt-4 text-lg font-semibold">
                                            {t("FilesInside")}:{" "}
                                            {selectedFile.name}
                                        </h4>
                                        <TableCustom
                                            indexing="true"
                                            headers={[
                                                t("File Name"),
                                                t("File Size"),
                                                t("File Scan Status"),
                                                t("Detection status"),
                                                t("Details"),
                                            ]}
                                            data={selectedFile.internalFiles}
                                            showDetail={handleInnerFileClick}
                                            selectedRows={(rows) =>
                                                setSelectedFiles(rows)
                                            }
                                            isDetailOpen={!!selectedInnerFile}
                                        />
                                    </Card>
                                </>
                            )}
                        </div>

                        {selectedScanDetail && (
                            <ScannedFileDetails
                                setShowDetail={() => setSelectedInnerFile(null)}
                                info={selectedInnerFile}
                                scanResults={selectedInnerFile.scanResults}
                                isScanDone={
                                    selectedInnerFile.scanStatus === "done"
                                }
                            />
                        )}
                    </div>
                </div>
               
            </div>
        </AppLayout>
    );