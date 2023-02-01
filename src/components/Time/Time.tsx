interface ITimeProps {
  time: string;
  twelveHourTime: string;
}

const Time = ({ time, twelveHourTime }: ITimeProps) => {
  return <time dateTime={time}>{twelveHourTime}</time>;
};

export default Time;
