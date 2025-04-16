"use client";

interface Props {
  attributes: Record<string, string | number | undefined>;
}

export default function ProductAttributesTable({ attributes }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entries = Object.entries(attributes).filter(([_, v]) => v !== undefined);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm text-left border-collapse">
        <tbody>
          {entries.map(([key, value], index) => (
            <tr
              key={key}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <th className="px-4 py-3 font-medium text-gray-600 whitespace-nowrap border-b border-gray-200 w-1/3">
                {key}
              </th>
              <td className="px-4 py-3 text-gray-800 border-b border-gray-200">
                {value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
