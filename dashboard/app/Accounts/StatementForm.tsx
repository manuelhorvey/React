// StatementForm.tsx
import React, { useState,useEffect } from 'react';

interface StatementFormProps {
  closeModal: () => void;
}

const StatementForm: React.FC<StatementFormProps> = ({ closeModal }) => {
  const [date, setDate] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [statements, setStatements] = useState<{ date: string; day: string }[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ day: string; input: string }[]>([]);

  const handleAddItemClick = () => {
    if (selectedDay && !selectedItems.find((item) => item.day === selectedDay)) {
      setSelectedItems([...selectedItems, { day: selectedDay, input: '' }]);
    }
  };

  const handleRemoveItemClick = (index: number) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleTextboxChange = (index: number, value: string) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].input = value;
    setSelectedItems(updatedItems);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStatement = {
      date,
      day: selectedDay,
    };
    setStatements([...statements, newStatement]);
    setDate('');
    setSelectedDay('');
  };

  const daysOfWeek = [
    'Monday Special',
    'Lucky Tuesday',
    'Mid Week',
    'Fortune Thursday',
    'Friday Bonanza',
    'National',
    'Sunday Aseda',
    'Sport',
    'Souveneir',
    'Vag',
    'Sunday Special',
    'International Raphael'
  ];

  const calculateTotalGross = () => {
    let total = 0;
    for (const item of selectedItems) {
      const gross = parseFloat(item.input) || 0; // Convert input to number, default to 0 if invalid
      total += gross;
    }
    return total;
  };

  const [commissionRate, setCommissionRate] = useState<number>(10);

  const calculateNet = (gross: number, rate: number) => {
    return gross - (gross * rate) / 100; // Calculate net based on commission rate
  };

  // Calculate total gross whenever selectedItems change
  useEffect(() => {
    const totalGross = calculateTotalGross();
    // Do something with the totalGross value (e.g., store it in state)
    // Example: setTotalGross(totalGross);
  }, [selectedItems]);

  // Calculate total gross whenever selectedItems change
  const totalGross = calculateTotalGross();
  const totalNet = calculateNet(totalGross, commissionRate);

  return (
    <div>
      <form className='mt-10' onSubmit={handleSubmit}>
        <h2 className=' items-center font-extrabold flex ml-36'> Dan Saviour Weekly Statement Of Account</h2>
        <label>
          Date:
          <input className=' bg-slate-400 m-5 rounded' type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Day:
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option className='p-4' value="">Select Day</option>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddItemClick}>Add</button>
        </label>
      </form>
      <div>
        <h2 className=' font-bold'>Games:</h2>
        <ul>
          {statements.map((statement, index) => (
            <li key={index}>
              {statement.date} - {statement.day}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectedItems.map((item, index) => (
            <div key={index} className="items-center flex justify-between">
            <p>{item.day}</p>
            <input className=' items-center cursor-auto text-center content-center bg-slate-300 m-1 p-1 rounded w-2/4' placeholder='Gross'
              type="text"
              value={item.input}
              onChange={(e) => handleTextboxChange(index, e.target.value)}
            />
            <button className='m-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
            onClick={() => handleRemoveItemClick(index)}>X</button>
          </div>
        ))}
            <div>
                <h2>Total Gross: {totalGross}</h2>
                <h2>Commission Rate: {commissionRate}%</h2>
                <h2>Total Net: {totalNet}</h2>
            </div>
      </div>
    </div>
  );
};

export default StatementForm;
