import React from 'react';
import { ConditionItem } from '../types';

interface Props {
  conditions: ConditionItem[];
}

const ConditionTable: React.FC<Props> = ({ conditions }) => (
  <table className="w-full border-collapse">
    <tbody>
      {conditions.map((condition, index) => (
        <tr key={index} className="border-b">
          <td className="p-4 border-r w-1/4 align-top font-semibold">
            {condition.title}
          </td>
          <td className="p-4">{condition.content}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ConditionTable;
