import { Info } from "lucide-react";
import { Ticket } from "lucide-react";
import { useState } from "react";

interface TransferPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedSeats: string[]) => void;
  ticketData: {
    sec: string;
    row: string;
    sit: string;
    ticketCount: number;
  };
}

const TransferPopup = ({ isOpen, onClose, onConfirm, ticketData }: TransferPopupProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  if (!isOpen) return null;

  const initialSeat = parseInt(ticketData.sit);
  const seats = Array.from({ length: ticketData.ticketCount }, (_, index) => 
    (initialSeat + index).toString()
  );

  const handleCheckboxChange = (seat: string) => {
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  // Helper function to determine grid columns based on ticket count
  const getGridColumns = (count: number) => {
    if (count <= 2) return 'grid-cols-2';
    if (count <= 3) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-black bg-opacity-50 absolute inset-0" />
      <div 
        className="bg-white rounded-t-xl w-full relative animate-slide-up max-h-[75vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 space-y-3"> {/* Reduced spacing */}
          <h2 className="text-sm font-bold text-center uppercase tracking-tighter"> {/* Reduced size and spacing */}
            Select tickets to transfer
          </h2>
          <hr className="border-gray-500" /> {/* More visible grey line */}
          <div className="bg-white p-3 rounded-lg flex gap-2 text-sm border-2 border-black">
            <Info className="text-black shrink-0 h-4 w-4 mt-0.5" />
            <p className="text-black">
              Only transfer tickets to people you know and trust to ensure everyone stays safe and socially distanced
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Ticket className="text-ticket-blue h-4 w-4" />
              <div className="flex gap-4">
                <div>
                  <span className="text-xs text-gray-500">SEC</span>
                  <p className="text-sm font-medium">{ticketData.sec}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">ROW</span>
                  <p className="text-sm font-medium">{ticketData.row}</p>
                </div>
              </div>
            </div>

            <div className={`grid ${getGridColumns(ticketData.ticketCount)} gap-3 justify-center`}>
              {seats.map(seat => (
                <div key={seat} className="relative flex flex-col items-center">
                  <div className="bg-[#007AFF] text-white py-1.5 px-2 rounded-t-lg text-center w-[72%]">
                    <span className="text-xs font-medium">Seat {seat}</span>
                  </div>
                  <label className="block cursor-pointer w-[72%]">
                    <div className="bg-gray-50 rounded-b-lg border border-gray-200 pt-1.5 pb-1.5 px-2 flex items-center justify-center transition-all hover:border-ticket-blue hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedSeats.includes(seat)}
                        onChange={() => handleCheckboxChange(seat)}
                        className="w-3 h-3 rounded border-gray-300 text-ticket-blue focus:ring-ticket-blue hover:scale-110 transition-transform" // Made smaller and added hover effect
                      />
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t p-3 bg-gray-50 sticky bottom-0">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {selectedSeats.length} ticket{selectedSeats.length !== 1 ? 's' : ''} selected
            </p>
            <button
              onClick={() => onConfirm(selectedSeats)}
              disabled={selectedSeats.length === 0}
              className="px-4 py-2 text-sm bg-ticket-blue text-white rounded-lg hover:bg-ticket-darkBlue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Transfer to
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;
