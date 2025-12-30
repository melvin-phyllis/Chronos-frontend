import { Calendar } from "@/components/ui/calendar"

interface Calendar18Props {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export function Calendar18({ date, setDate }: Calendar18Props) {
    return (
        <div className="w-full flex-1 flex flex-col bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full flex-1 flex flex-col [--cell-size:--spacing(7)] md:[--cell-size:--spacing(10)] lg:[--cell-size:--spacing(12)]"
                buttonVariant="ghost"
            />
        </div>
    )
}
