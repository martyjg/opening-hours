type TimeProps = {
  time: string;
  twelveHourTime: string;
};

const Time = ({ time, twelveHourTime }: TimeProps) => {
  return <time dateTime={time}>{twelveHourTime}</time>;
};

export default Time;
