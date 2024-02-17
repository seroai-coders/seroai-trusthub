import { Identifier } from "@prisma/client";
import { IRowNode } from "ag-grid-community";
import clsx from "clsx";
import { useState } from "react";

import { PiListMagnifyingGlassDuotone } from "react-icons/pi";

const IdentifiersRenderer = ({
  data,
  isInputRow = () => false,
  node,
}: {
  data: { identifiers: Identifier[] };
  isInputRow?: (node: IRowNode) => boolean;
  node: IRowNode;
}) => {
  const [isDisplaying, setIsDisplaying] = useState(false);
  const inputRow = isInputRow(node);

  return (
    <div
      className="flex items-center space-x-2 h-full"
      onClick={() => {
        if (inputRow) return;
        setIsDisplaying(!isDisplaying);
      }}
    >
      {isDisplaying ? (
        <div className="space-x-1">
          {data.identifiers.length ? (
            data.identifiers.map(({ name }, index) => (
              <div key={index} className="badge">
                {name}
              </div>
            ))
          ) : (
            <span className="ml-2">-</span>
          )}
        </div>
      ) : (
        <div className={clsx({ "cursor-pointer": !inputRow })}>
          <PiListMagnifyingGlassDuotone size={20} />
        </div>
      )}
    </div>
  );
};

export default IdentifiersRenderer;
