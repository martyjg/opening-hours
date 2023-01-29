type TimeProps = {
  time: string;
  twelveHourClock: string;
};

const Time = ({ time, twelveHourClock }: TimeProps) => {
  return <time dateTime={time}>{twelveHourClock}</time>;
};

export default Time;
