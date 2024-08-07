import React, { ChangeEvent } from "react";
import "./write.css";

interface WorkTypeSelectorProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const WorkTypeSelector: React.FC<WorkTypeSelectorProps> = ({
  value,
  onChange,
}) => (
  <div className="select">
    <p>Вид работы</p>
    <select value={value} onChange={onChange}>
      <option value="">Выберите вид работы</option>
      <option value="внесение гербецидов">внесение гербецидов</option>
      <option value="грейдирование дорог">грейдирование дорог</option>
      <option value="измельчение ветвей">измельчение ветвей</option>
      <option value="механизированная обрезка">механизированная обрезка</option>
      <option value="обслуживание платформы">обслуживание платформы</option>
      <option value="опрыскивание">опрыскивание</option>
      <option value="подвоз раствора гербецидов">
        подвоз раствора гербецидов
      </option>
      <option value="завоз контейнеров в междурядья">
        завоз контейнеров в междурядья
      </option>
    </select>
  </div>
);

export default WorkTypeSelector;
