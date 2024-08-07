// import React, { useState } from "react";
// import "./write.css";

// const AddWrite = () => {
//   const [remainder, setRemainder] = useState("");
//   const [issued, setIssued] = useState("");
//   const [workType, setWorkType] = useState("");
//   const [hours, setHours] = useState("");
//   const [tractorType, setTractorType] = useState("");
//   const [tankCapacity, setTankCapacity] = useState(0);
//   const [finalRemainder, setFinalRemainder] = useState(null);
//   const [totalSpent, setTotalSpent] = useState(null);
//   const [consumptionType, setConsumptionType] = useState("");

//   const handleWorkTypeChange = (e) => {
//     setWorkType(e.target.value);
//   };

//   const handleTractorTypeChange = (e) => {
//     const selectedTractor = e.target.value;
//     setTractorType(selectedTractor);
//     setTankCapacity(getTankCapacity(selectedTractor));
//   };

//   const getTankCapacity = (tractorType) => {
//     switch (tractorType) {
//       case "ландини":
//         return 65;
//       case "МТЗ-92.1":
//         return 95;
//       case "МТЗ-82.1":
//         return 120;
//       default:
//         return 0;
//     }
//   };

//   const getFuelConsumptionRange = (workType) => {
//     switch (workType) {
//       case "внесение гербецидов":
//         return [4.5, 5];
//       case "грейдирование дорог":
//         return [7, 11];
//       case "измельчение ветвей":
//         return [11, 15];
//       case "механизированная обрезка":
//         return [12, 14];
//       case "обслуживание платформы":
//         return [3, 11];
//       case "опрыскивание":
//         return [3.8, 5.5];
//       case "подвоз раствора гербецидов":
//         return [7, 12];
//       case "завоз контейнеров в междурядья":
//         return [5, 5.5];
//       default:
//         return [0, 0];
//     }
//   };

//   const calculateFinalValues = () => {
//     const remainderNum = Number(remainder);
//     const issuedNum = Number(issued);
//     const hoursNum = Number(hours);

//     if (
//       isNaN(remainderNum) ||
//       isNaN(issuedNum) ||
//       isNaN(hoursNum) ||
//       !workType ||
//       !consumptionType
//     ) {
//       alert("введите корректные данные.");
//       return;
//     }

//     if (remainderNum < 0 || issuedNum < 0 || hoursNum < 0) {
//       alert("Все значения должны быть неотрицательными.");
//       return;
//     }

//     const initialFuel = Math.min(tankCapacity, remainderNum + issuedNum);

//     if (initialFuel > tankCapacity) {
//       alert("Общий объем топлива превышает объем бака.");
//       return;
//     }

//     const [min, max] = getFuelConsumptionRange(workType);
//     let consumptionRate;

//     switch (consumptionType) {
//       case "min":
//         consumptionRate = min;
//         break;
//       case "avg":
//         consumptionRate = (min + max) / 2;
//         break;
//       case "max":
//         consumptionRate = max;
//         break;
//       default:
//         consumptionRate = 0;
//     }

//     const additionalSpent = hoursNum * consumptionRate;
//     const totalSpentValue = additionalSpent.toFixed(2);
//     setTotalSpent(totalSpentValue);

//     const remainingFuel = initialFuel - additionalSpent;

//     if (remainingFuel < 0) {
//       alert("Недостаточно топлива для выполнения работы.");
//       return;
//     }

//     setFinalRemainder(remainingFuel.toFixed(2));
//   };

//   return (
//     <div className="container">
//       <input
//         type="number"
//         placeholder="остаток при выезде"
//         value={remainder}
//         onChange={(e) => setRemainder(e.target.value)}
//       />
//       <input
//         type="number"
//         placeholder="выдано"
//         value={issued}
//         onChange={(e) => setIssued(e.target.value)}
//       />
//       <div>
//         <p>Вид работы</p>
//         <select value={workType} onChange={handleWorkTypeChange}>
//           <option value="">Выберите вид работы</option>
//           <option value="внесение гербецидов">внесение гербецидов</option>
//           <option value="грейдирование дорог">грейдирование дорог</option>
//           <option value="измельчение ветвей">измельчение ветвей</option>
//           <option value="механизированная обрезка">
//             механизированная обрезка
//           </option>
//           <option value="обслуживание платформы">обслуживание платформы</option>
//           <option value="опрыскивание">опрыскивание</option>
//           <option value="подвоз раствора гербецидов">
//             подвоз раствора гербецидов
//           </option>
//           <option value="завоз контейнеров в междурядья">
//             завоз контейнеров в междурядья
//           </option>
//         </select>
//       </div>
//       <div>
//         <p>Вид трактора</p>
//         <select value={tractorType} onChange={handleTractorTypeChange}>
//           <option value="">Выберите вид трактора</option>
//           <option value="ландини">ландини</option>
//           <option value="МТЗ-92.1">МТЗ-92.1</option>
//           <option value="МТЗ-82.1">МТЗ-82.1</option>
//         </select>
//         {tractorType && <p>Объем бака: {tankCapacity} литров</p>}
//       </div>
//       {workType && (
//         <div>
//           <input
//             type="number"
//             placeholder="Часы работы"
//             value={hours}
//             onChange={(e) => setHours(e.target.value)}
//           />
//           <div>
//             <button onClick={() => setConsumptionType("min")}>
//               Мин. расход
//             </button>
//             <button onClick={() => setConsumptionType("avg")}>
//               Средний расход
//             </button>
//             <button onClick={() => setConsumptionType("max")}>
//               Макс. расход
//             </button>
//           </div>
//           <button onClick={calculateFinalValues}>Рассчитать расход</button>
//         </div>
//       )}
//       {finalRemainder !== null && totalSpent !== null && (
//         <div>
//           <p>Израсходовано топлива: {totalSpent} литров</p>
//           <p>Конечный остаток топлива в баке: {finalRemainder} литров</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddWrite;

// {
//         "cars": [
//           {
//             "id": "1",
//             "owner": "Баркинхоев Руслан.Б",
//             "car": "Chevrolet Niva",
//             "numbers": "О230ОС",
//             "limit": 340,
//             "arrest": "false",
//             "remaining": 340
//           },
//           {
//             "id": "2",
//             "owner": "Баркинхоев Магомед.М",
//             "car": "Vaz-21074",
//             "numbers": "Р419ВК 34",
//             "limit": 100,
//             "arrest": "false",
//             "remaining": 100
//           },
//           {
//             "id": "3",
//             "owner": "Заурбеков Магомед.С",
//             "car": "Lada-niva",
//             "numbers": "О688КО 06",
//             "limit": 200,
//             "arrest": "false",
//             "remaining": 200
//           },
//           {
//             "id": "4",
//             "owner": "Заурбеков Магомед.С",
//             "car": "Lada-niva",
//             "numbers": "О511КО 06",
//             "limit": 200,
//             "arrest": "false",
//             "remaining": 200
//           },
//           {
//             "id": "5",
//             "owner": "Костоев Хасан.М",
//             "car": "Lada-niva",
//             "numbers": "Т534КА 06",
//             "limit": 200,
//             "arrest": "false",
//             "remaining": 200
//           },
//           {
//             "id": "6",
//             "owner": "Плиев Ислам",
//             "car": "Vaz-21074",
//             "numbers": "Е883КХ 116",
//             "limit": 250,
//             "arrest": "false",
//             "remaining": 250
//           },
//           {
//             "id": "7",
//             "owner": "Охрана",
//             "car": "Vaz-21074",
//             "numbers": "К117АН 116",
//             "limit": 250,
//             "arrest": "false",
//             "remaining": 250
//           },
//           {
//             "id": "8",
//             "owner": "Саралиев Руслан.А",
//             "car": "Chevrolet Niva",
//             "numbers": "Т409ОО 06",
//             "limit": 330,
//             "arrest": "false",
//             "remaining": 330
//           },
//           {
//             "id": "9",
//             "owner": "Баркинхоев Адам.Р",
//             "car": "Vaz-21074",
//             "numbers": "О534ОХ 06",
//             "limit": 250,
//             "arrest": "false",
//             "remaining": 250
//           },
//           {
//             "id": "10",
//             "owner": "Харсиев Муса.Ю",
//             "car": "Lada-niva",
//             "numbers": "О611ТА 06",
//             "limit": 150,
//             "arrest": "false",
//             "remaining": 150
//           },
//           {
//             "id": "11",
//             "owner": "Дзенгиев Асхаб.А",
//             "car": "Lada-niva",
//             "numbers": "О644СН 06",
//             "limit": 200,
//             "arrest": "false",
//             "remaining": 200
//           },
//           {
//             "id": "12",
//             "owner": "Кодзоев Махмуд",
//             "car": "Lada-granta",
//             "numbers": "Т133АК 168",
//             "limit": 200,
//             "arrest": "false",
//             "remaining": 200
//           }
//         ]
//       }
