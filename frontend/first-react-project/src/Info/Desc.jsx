import MyImg from '../assets/me.jpg'
function Desc () {
    return (
        <div>
            <h1>Hello there! I'm Osama, a web developer</h1>
            <h3>Here's my image</h3>
            <img src={MyImg} alt="" />
        </div>
    )
}
export default Desc;