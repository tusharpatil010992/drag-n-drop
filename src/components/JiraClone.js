            import React, {useState} from 'react'
            import './jiraclone.css'
            const JiraClone = () => {

                const [columns, setColumns] = useState({
                    column1: ["item1","item2"],
                    column2: ["item3","item4"],
                    column3: ["item5","item6"],
                    // column4: ["item7","item8"],
                    // column5: ["item9","item10"],
                    // column6: ["item11","item12"],
                });

                const onDrop= (event, toColumn) => {
                    const item = event.dataTransfer.getData("item");
                    const fromColumn = event.dataTransfer.getData("fromColumn");

                    if(fromColumn === toColumn){
                        return;
                    }

                    setColumns((prev) => {
                        const fromColumnData = prev[fromColumn].filter(existingItem => existingItem !== item);
                        const toColumnData = [...prev[toColumn], item];

                        return {
                            ...prev,
                            [toColumn]: toColumnData,
                            [fromColumn]: fromColumnData
                        }
                    })
                }

                const onDragOver = (e) => {
                    e.preventDefault();
                }

                const onDragStart = (event, item, column) => {
                    console.log("From column name ",column)
                    event.dataTransfer.setData("item", item);
                    event.dataTransfer.setData("fromColumn", column);
                }

            return (
                <div className="jira-container">
                    {
                        Object.keys(columns).map(column => <div className='column' key={column} onDrop={(e) => { onDrop(e, column); }}  onDragOver={onDragOver}  >
                            <div className='column-header'>{column}</div>
                            <div className='item-container'>
                                {
                                columns[column].map((item) => (
                                    <div key={item} className='item' draggable onDragStart={(e) => onDragStart(e, item, column)}>
                                        {item}
                                    </div>
                                ))
                                }
                            </div>
                        </div>)
                    }
                </div>
            )
            }

            export default JiraClone
