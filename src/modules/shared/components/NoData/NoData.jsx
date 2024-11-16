
import noData from "../../../../assets/images/sora.png";
export default function NoData() {
  return (
  <>
    <div className=" text-center">
      <img src={noData} alt="" />
      <h5>No Data!</h5>
    </div>
  </>
  );
}