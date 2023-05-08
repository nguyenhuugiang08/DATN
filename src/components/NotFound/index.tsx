import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className='not-found'>
            <img
                src='https://actappg2.misacdn.net/img/bg_report_nodata.76e50bd8.svg'
                alt='logo NotFound'
                style={{ width: "170px" }}
            />
            <span style={{ marginBottom: "80px" }}>Không có dũ liệu</span>
        </div>
    );
};
export default NotFound;
