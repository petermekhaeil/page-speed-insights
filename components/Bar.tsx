import { roundDown } from '../app/helpers';
import { Histogram } from '../app/typings';

const Bar = ({ histogram }: { histogram: Histogram[] }) => {
  const val1 = roundDown(histogram[0].density);
  const val2 = roundDown(histogram[1].density);
  const val3 = roundDown(histogram[2].density);

  let widthVal1 = val1;
  let widthVal2 = val2;
  let widthVal3 = val3;

  if (widthVal2 < 10) {
    widthVal2 = 10;

    if (widthVal1 > widthVal3) {
      widthVal1 -= 9;
    } else {
      widthVal3 -= 9;
    }
  }

  if (widthVal3 < 10) {
    widthVal1 -= 9;
    widthVal3 = 10;
  }

  if (widthVal1 + widthVal2 + widthVal3 !== 100) {
    widthVal1 += 100 - (widthVal1 + widthVal2 + widthVal3);
  }

  if (val3 <= 1) {
    widthVal1 += 100 - (widthVal1 + widthVal2 + val3);
  }

  return (
    <div>
      <div
        className="inline-block text-center text-black rounded-tl-md rounded-bl-md"
        style={{
          width: `${widthVal1}%`,
          backgroundColor: '#0cce6b'
        }}
      >
        {val1}%
      </div>
      <div
        className={`inline-block text-center text-black ${
          val3 <= 1 ? 'rounded-tr-md rounded-br-md' : ''
        }`}
        style={{
          width: `${widthVal2}%`,
          backgroundColor: '#ffa400'
        }}
      >
        {val2}%
      </div>
      {val3 > 1 && (
        <div
          className="inline-block text-center text-black rounded-tr-md rounded-br-md"
          style={{
            width: `${widthVal3}%`,
            backgroundColor: '#ff4e42'
          }}
        >
          {val3}%
        </div>
      )}
    </div>
  );
};

export default Bar;
