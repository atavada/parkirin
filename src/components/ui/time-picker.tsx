"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TimeRange {
	start: string;
	end: string;
}

interface TimeRangePickerProps {
	value: TimeRange;
	onChange: (value: string) => void;
}

export default function TimeRangePicker({ value, onChange }: TimeRangePickerProps) {
	const [timeRange, setTimeRange] = React.useState<TimeRange>(value || { start: "09:00", end: "17:00" });

	React.useEffect(() => {
		const formattedTimeRange = `${convertTimeFormat(timeRange.start)}-${convertTimeFormat(timeRange.end)}`;
		onChange(formattedTimeRange);
	}, [timeRange, onChange]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					id="time-range"
					variant={"outline"}
					className={cn("w-full justify-start text-left font-normal", !timeRange && "text-muted-foreground")}
				>
					<Clock className="mr-2 h-4 w-4" />
					{timeRange.start && timeRange.end ? (
						<>
							{timeRange.start} - {timeRange.end}
						</>
					) : (
						<span>Pick a time range</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-4" align="start">
				<div className="space-y-4">
					<h4 className="font-medium leading-none">Pilih rentang waktu</h4>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="start-time">Waktu Buka</Label>
							<Select
								value={timeRange.start}
								onValueChange={(value) => setTimeRange((prev) => ({ ...prev, start: value }))}
							>
								<SelectTrigger id="start-time">
									<SelectValue placeholder="Waktu Buka" />
								</SelectTrigger>
								<SelectContent>
									{generateTimeOptions().map((time) => (
										<SelectItem key={`start-${time}`} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="end-time">Waktu Tutup</Label>
							<Select
								value={timeRange.end}
								onValueChange={(value) => setTimeRange((prev) => ({ ...prev, end: value }))}
							>
								<SelectTrigger id="end-time">
									<SelectValue placeholder="Waktu Tutup" />
								</SelectTrigger>
								<SelectContent>
									{generateTimeOptions().map((time) => (
										<SelectItem key={`end-${time}`} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}

function generateTimeOptions() {
	const options = [];
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
			options.push(time);
		}
	}
	return options;
}

function convertTimeFormat(time: string): string {
	// Converts "HH:mm" to "HH.mm"
	return time.replace(":", ".");
}
