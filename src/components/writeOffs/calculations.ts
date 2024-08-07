interface CalculateFinalValuesProps {
  remainder: string;
  issued: string;
  hours: string;
  workType: string;
  tractorType: string;
  tankCapacity: number;
  consumptionType: string;
  setFinalRemainder: (value: string) => void;
  setTotalSpent: (value: string) => void;
}

const getFuelConsumptionRange = (workType: string) => {
  switch (workType) {
    case "внесение гербецидов":
      return { min: 4.5, avg: 4.75, max: 5 };
    case "грейдирование дорог":
      return { min: 7, avg: 8.5, max: 11 };
    case "измельчение ветвей":
      return { min: 11, avg: 12.5, max: 15 };
    case "механизированная обрезка":
      return { min: 12, avg: 13, max: 14 };
    case "обслуживание платформы":
      return { min: 3, avg: 7.5, max: 11 };
    case "опрыскивание":
      return { min: 3.8, avg: 4.65, max: 5.5 };
    case "подвоз раствора гербецидов":
      return { min: 5, avg: 8.5, max: 12 };
    case "завоз контейнеров в междурядья":
      return { min: 5, avg: 5.25, max: 5.5 };
    default:
      return { min: 0, avg: 0, max: 0 };
  }
};

export const calculateFinalValues = ({
  remainder,
  issued,
  hours,
  workType,
  tankCapacity,
  consumptionType,
  setFinalRemainder,
  setTotalSpent,
}: CalculateFinalValuesProps) => {
  const remainderNum = Number(remainder);
  const issuedNum = Number(issued);
  const hoursNum = Number(hours);

  if (
    isNaN(remainderNum) ||
    isNaN(issuedNum) ||
    isNaN(hoursNum) ||
    !workType ||
    !consumptionType
  ) {
    alert("Пожалуйста, введите корректные данные.");
    return;
  }
  if (remainderNum < 0 || issuedNum < 0 || hoursNum < 0) {
    alert("Все значения должны быть неотрицательными.");
    return;
  }

  if (remainderNum < 0 || issuedNum < 0 || hoursNum < 0) {
    alert("Все значения должны быть неотрицательными.");
    return;
  }

  const initialFuel = Math.min(tankCapacity, remainderNum + issuedNum);

  if (initialFuel > tankCapacity) {
    alert("Общий объем топлива превышает объем бака.");
    return;
  }

  const { min, avg, max } = getFuelConsumptionRange(workType);
  let consumptionRate;

  switch (consumptionType) {
    case "min":
      consumptionRate = min;
      break;
    case "avg":
      consumptionRate = avg;
      break;
    case "max":
      consumptionRate = max;
      break;
    default:
      consumptionRate = 0;
  }

  const additionalSpent = hoursNum * consumptionRate;
  const totalSpentValue = additionalSpent.toFixed(2);
  setTotalSpent(totalSpentValue);

  const remainingFuel = initialFuel - additionalSpent;

  if (remainingFuel < 0) {
    alert("Недостаточно топлива для выполнения работы.");
    return;
  }

  setFinalRemainder(remainingFuel.toFixed(2));
};
