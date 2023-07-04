进口 反应, { 使用状态 } 从 “做出反应”;
进口 "./Signup.css ";
进口 googleicon 从 "../../Assets/谷歌图标. svg ";
进口 侧边图像 从 "../../Assets/SidebarImageSignup.jpg ";
进口 { 使用导航 } 从 " react-路由器-dom ";
进口 { useGoogleLogin } 从 " @react-oauth/google ";
进口 axios 从 阿西奥斯的;
进口 饼干 从 ' js-cookie ';
进口 简单加密 从 '简单加密js ';

出口 系统默认值 功能 签约() {
  
  常数 秘钥=过程。包封/包围（动词envelop的简写）.反应_应用_加密_秘密;
  常数 秘密党员 = 新的简单加密(秘钥);
  常数 航行=使用导航();

  尝试{
    常数 获取getcookies=饼干。得到('链接数据')
    常数 { 电子邮件 }=加密。解释(获取getcookies);

    如果(电子邮件){
      航行(/聊天');
    } 
  } 捕捉 (犯罪){
控制台。原木(犯罪);
  }

 
  
  常数 [表单数据,setFormData] = 使用状态({
    fnname:'',
    名字:'',
    电子邮件:'',
    密码:'',
  })
  常数 [输出,设置输出] = 使用状态("");
  常数 [装货, setLoading] = 使用状态(错误的);

  功能 遥控(e){
    setFormData({...表单数据，[e.目标.名字]:e。目标.价值 });
  }

  常数 处理提交 = 异步ˌ非同步(asynchronous) (e) => {
    setLoading(真实的);
    如果(！表单数据。fnname|| !表单数据。名字|| !表单数据。电子邮件|| !表单数据。密码){
      设置输出("所有字段都是必填的");
      setLoading(错误的);
      返回;
    }
    如果(!/^[A-Z0-9._%+-]+@[A-Z0-9。-]+\.[A-Z]{2，}$/i.试验(表单数据。电子邮件)) {
      设置输出("请输入有效的电子邮件地址");
      setLoading(错误的);
      返回;
    }
    如果(表单数据。密码.长度 < 6){
      设置输出("密码长度必须至少为6个字符");
      setLoading(错误的);
      返回;
    }
    尝试 {
      //const response = await axios . post(' http://localhost:3001/auth/sign up '，formData)；
      常数 反应 = 等待axios。邮政(' https://link up-back end-k05n . on render . com/auth/sign up '，表单数据);
      setLoading(错误的);
控制台。原木(反应);

      如果(！领航员。在线的){
        设置输出("您已连接到互联网")
      }
      如果(回应。状态 === 200){
        航行("/登录");
      }
      else if(response.status === 404){
        setOutput("Unable to connect to server");
      }

    } catch (err) {
      console.log(err);
      if (err.response) {
        setLoading(false);
        if (err.response.status === 404) {
          setOutput("Unable to connect to server");
        } else {
          setOutput(err.response.data.message);
        }
      } else {
        setOutput("Network error occurred");
      }
    }}

    const googlelogin = useGoogleLogin({
      client_id: process.env.REACT_APP_CLIENT_ID,
      onSuccess: response => loginsuccess(response),
  });
  
  async function loginsuccess(response) {
    try {
      const { access_token } = response;
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const userData = userInfoResponse.data;
      const accessToken = crypto.encrypt(userData);
      Cookies.set('linkupdata',accessToken);
      navigate('/chat');

    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  

  return (
    <>
      <div className="signup-page-outer">
        <img src={SidebarImage} alt="Internet Error" className="sidebar" />
        <div className="signup-form-outer">
          <div className="signup-page-title">
            Get <span style={{ color: "blue" }}>Link Up</span>
          </div>

          <div className="form-input-names">
            <div>
              <div className="label">First Name</div>
              <input type="text" placeholder="Arpit" value={formData.fname} name="fname" onChange={handleChange} />
            </div>
            <div>
              <div className="label">Last Name</div>
              <input type="text" placeholder="Tyagi" value={formData.lname} name="lname" onChange={handleChange} />
            </div>
          </div>

          <div className="label">Email Address</div>
          <input type="email" placeholder="youremail@example.com" value={formData.email} name="email" onChange={handleChange} />

          <div className="label">Password</div>
          <input type="password" placeholder="••••••••••" value={formData.password} name="password" onChange={handleChange} />
          <div style={{color:"red"}}>
            {output}
          </div>

          <button className="signup-btn"  onClick={handleSubmit}>
            {loading===false?(
              <div>Sign Up</div>
            ):(
              <div className="spinner-border" style={{height:"20px",width:"20px"}}></div>       
            )}
          </button>
          <div>
            Already have an account <Link to={'/login'}>log in</Link>
          </差异>
          <div className="or">or</div>
          <div className="google-signup-btn" onClick={googlelogin}>
            continue with Google
            <img src={googleicon} className="googleicon" alt="google-icon" />
          </div>
        </div>
      </div>
    </>
  );
}
