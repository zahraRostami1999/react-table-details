import React from 'react';
import { useState } from 'react';

function Tables() {
    const [selectedInternal, setSelectedInternal] = useState(false);
    const [selectedResultScan, setSelectedResultScan] = useState(false);

    return (
        <>
            <div className="min-h-screen w-full flex justify-center">
                <div className="w-11/12 flex justify-center flex-wrap my-10 gap-10">
                    {
                        !selectedInternal && (
                            <div className="bg-red-200 w-2/3 h-64 p-5" onClick={() => {
                                setSelectedInternal(true)
                            }}>
                                table1
                            </div>
                        )
                    }
                    {
                        (selectedInternal || selectedResultScan) && (
                            <div className={`bg-blue-200 h-64 p-5 ${selectedResultScan ? `w-1/5` : 'w-2/3'}`} onClick={() => {
                                setSelectedResultScan(true)
                            }}>
                                table2
                            </div>
                        )
                    }
                    {
                        selectedResultScan && (
                            <div className="bg-green-200 w-2/3 h-64 p-5">
                                scan result
                            </div>
                        )
                    }

                </div>

            </div>
        </>
    )
}

export default Tables
