import myPhoto from '../assets/IMG_4705.jpg'

const Home = () => {
  return (
    <div className="w-100 h-auto bg-white rounded-4" style={{boxShadow:'0 5px 5px #cccccc'}}>
      <div className="d-flex justify-content-center align-items-center gap-5 py-5">
        <div className="text-primary" style={{ lineHeight: "25px" }}>
          <p className="fs-1 fw-semibold">
            Hi! I'm Khanit <br />
            <span className="fs-4 fw-medium">Fullstack Developer</span> <br />
            <span className="fs-5 fw-normal">Sripathum University</span>
          </p>
        </div>
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: "20rem", height: "20rem", boxShadow:'-3px -3px 0px #cccccc, 3px 3px 0px #0d6efd' }}
        >
          {/*ยังไม่ได้ถ่ายรูปนักศึกษาครับ [--'] */}
          <img
            className="w-100 h-100 object-fit-cover"
            src={myPhoto}
            alt="Picture"
          />
        </div>
      </div>
      <hr className="w-75 mx-auto opacity-100" style={{color:'#326096'}} />
      <div className="w-50 mx-auto pb-5">
        <h1 className="text-center text-primary mb-5">About me</h1>
        <span style={{color:'#326096'}}>
          <b>ชื่อ-นามสกุล:</b> คณิศร์ จำจด <br />
          <b>ชื่อเล่น:</b> เต้ย <br />
          <b>ปัจจุบันศึกษาที่:</b> มหาวิทยาลัยศรีปทุม <br />
          <b>คณะ:</b> เทคโนโลยีสารสนเทศ <br />
          <b>สาขา:</b> วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ (Full stack) <br />
          <b>ชั้นปีที่:</b> 2 <br />
          <b>รหัสนักศึกษา:</b> 67163280 <br />
          <hr className="w-25 opacity-100" style={{color:'#326096'}} />
          <b>งานอดิเรก:</b> ฟังเพลง, เขียนโปรแกรม <br />
          <b>ความสามารถพิเศษ:</b> เรียนรู้ได้ไว <br />
          <b>เป้าหมายในอนาคต:</b> อยากเป็น Full stack Developer <br />
          <b>สิ่งที่ชอบ:</b> ชอบเงิน, ชอบทานอาหาร, ชอบเที่ยว, ชอบคนตรง ๆ และมีกาลเทศะ <br />
          <b>สิ่งที่ไม่ชอบ:</b> ไม่ชอบหม่าล่า, ไม่ชอบคนพูดโกหก <br />
        </span>
      </div>
    </div>
  );
};

export default Home;
