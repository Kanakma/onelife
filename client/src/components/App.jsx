import React from 'react';
import InputElement from 'react-input-mask';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      errors: {},
      user: {
        email: '',
        name: '',
        lastname: '',
        phone: '',
        major: ''
      },
      checkContent: false
    };
    this.changeUser = this.changeUser.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.cleanUser = this.cleanUser.bind(this);
  }
  changeUser(event){
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    if((this.state.user.email.length && this.state.user.name.length && this.state.user.lastname.length && this.state.user.phone.length && this.state.user.major.length) > 0){
      this.setState({
        user: user,
        checkContent: true
      })
    }else {
      this.setState({
        user: user,
        checkContent: false
      })
    }

  }
  cleanUser(){
    this.setState({
      user: {
        email: '',
        name: '',
        lastname: '',
        phone: '',
        major: ''
      },
      checkContent: false,
      message: '',
      errors: {}
    })
  }
  submitForm(event){
    event.preventDefault();
    const email = encodeURIComponent(this.state.user.email);
    const name = encodeURIComponent(this.state.user.name);
    const lastname = encodeURIComponent(this.state.user.lastname);
    const phone = encodeURIComponent(this.state.user.phone);
    const major = encodeURIComponent(this.state.user.major);
    const formData = `name=${name}&email=${email}&lastname=${lastname}&phone=${phone}&major=${major}`;
    axios.post('/api/apply', formData, {
      responseType: 'json',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'}
    })
      .then(res => {
          this.setState({
            message: res.data.message,
            errors: {},
            user: {
              email: '',
              name: '',
              lastname: '',
              phone: '',
              major: ''
            },
            checkContent: false
          });
      })
        .catch(err => {
          if (err.response) {
            const errors = err.response ? err.response : {};
            errors.summary = err.response.data.message;
            this.setState({
              errors
            });
          }
        });
  }
  render() {
    return (
      <div>
      <a id="menu-toggle" href="#" className="btn btn-dark btn-lg toggle"><i className="fa fa-bars"></i></a>
      <nav id="sidebar-wrapper">
          <ul className="sidebar-nav">
              <a id="menu-close" href="#" className="btn btn-light btn-lg pull-right toggle"><i className="fa fa-times"></i></a>
              <li className="sidebar-brand">
                  <a href="#top">МУИТ</a>
              </li>
              <li>
                  <a href="#top">Главная</a>
              </li>
              <li>
                  <a href="#about">О МУИТ</a>
              </li>
              <li>
                  <a href="#services">Специальности</a>
              </li>
              <li>
                  <a href="#portfolio" >Студенческая жизнь</a>
              </li>
              <li>
                  <a href="#" data-toggle="modal" data-target=".forget-modal">Подать заявку</a>
              </li>
              <li>
                  <a href="#contact">Контакты</a>
              </li>
              <li>
                  <a href="/logout">Выход</a>
              </li>
          </ul>
      </nav>
      <header id="top" className="header">
          <div className="text-vertical-center">
              <h1>Международный Университет Информационных Технологий</h1>
              <br/>
              <a href="#" className="btn btn-light btn-lg" data-toggle="modal" data-target=".forget-modal" style={{paddingLeft: '25px', paddingRight: '25px'}}>Подать заявку</a>
              <br/><br/><a href="#about" className="btn btn-dark btn-lg">Подробнее</a>
          </div>
      </header>
      <section id="about" className="about">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-left">
                      <h2 className="text-center">Международный Университет Информационных Технологий</h2>
                      <br/>
                      <div className="lead">
                      <strong>Миссия Университета:</strong> Мы создаем уникальные условия для свободного творчества и становления новой личности!
                      <br/>  <br/>
                      <strong>Видение Университета:</strong> К 2020 году АО «Международный университет информационных технологий» будет представлять собой научно-исследовательский университет с мировым рейтингом, осуществляющим подготовку международно-признанных IT-специалистов в системе колледж-бакалавриат-магистратура-PhD и являться центром инноваций и науки в области ИКТ центрально-азиатского региона.
                      <br/>  <br/>
                      <strong>Цель:</strong> Становление и развитие академической структуры Университета, эффективность которой позволит повысить качественный уровень преподавания и успеваемость студентов.
                      <br/>  <br/>
                      <strong>Задачи:</strong>
                      <br/>
                      1) формирование и развитие системы трехступенчатого образования: бакалавриат- магистратура- докторантура;
                      <br/>
                      2) продвижение к академической свободе;
                      <br/>
                      3) выход на позиции одного из ведущих Университетов постсоветского пространства в ИКТ образовании;
                      <br/>
                      4) налаживание эффективного взаимодействия с потенциальными работодателями.
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section id="services" className="services bg-primary">
          <div className="container">
              <div className="row text-center">
                      <h2>Специальности</h2>
                      <hr className="small"/>
                      <div className="row">
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-desktop fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Информационные системы</strong>
                                  </h4>
                                  <p>Область науки и техники, которая включает совокупность средств, способов и методов человеческой деятельности, направленных на создание и применение систем сбора, представления, хранения, передачи и обработки информации.</p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-code-fork fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Радиотехника, электроника и телекоммуникации</strong>
                                  </h4>
                                  <p>Во время обучения студенты осваивают такие дисциплины как: «Системы мобильной связи», «Технологии беспроводной связи», «Радиотехнические устройства», «Программирование в телекоммуникациях», «Сети и системы телекоммуникаций», «Цифровая обработка сигналов». </p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-book fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Информатика</strong>
                                  </h4>
                                  <p>Позволяет использовать аналитические и критические принципы мышления в области вычислительной техники и информатики к выбранной профессии,  быть полезными внутри и за пределами традиционной сферы компьютерной техники, использовать высокие профессиональные и этические стандарты, чтобы стать эффективным менеджером и лидером общества.</p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                  <i className="fa fa-circle fa-stack-2x"></i>
                                  <i className="fa fa-bar-chart fa-stack-1x text-primary"></i>
                              </span>
                                  <h4>
                                      <strong>Финансы в IT</strong>
                                  </h4>
                                  <p>Дает теоретические основы и количественные методы для финансового анализа, стратегического планирования, бюджетирования капиталовложений, налогообложения, управления оборотным капиталом, источниками капитала, оценки рисков и стоимостной оценки ценных бумаг и активов фирм.</p>
                              </div>
                          </div>
                      </div>
                      <hr />
                      <div className="row">
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-code fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Вычислительная техника и программное обеспечение</strong>
                                  </h4>
                                  <p>Специальность включает изучение актуальных вопросов в области организации и взаимодействия операционных систем, а также сбор, хранение, передачу и анализ данных.</p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-tasks fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Математическое и компьютерное моделирование</strong>
                                  </h4>
                                  <p>В рамках специальности изучают методы и технологии организации и обработки данных.</p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                    <i className="fa fa-circle fa-stack-2x"></i>
                                    <i className="fa fa-microphone fa-stack-1x text-primary"></i>
                                  </span>
                                  <h4>
                                      <strong>Электронная журналистика</strong>
                                  </h4>
                                  <p>Новая разновидность журналистики, появившаяся в конце XX века с развитием и распространением Интернета.</p>
                              </div>
                          </div>
                          <div className="col-md-3 col-sm-6">
                              <div className="service-item">
                                  <span className="fa-stack fa-4x">
                                  <i className="fa fa-circle fa-stack-2x"></i>
                                  <i className="fa fa-calendar fa-stack-1x text-primary"></i>
                              </span>
                                  <h4>
                                      <strong>Менеджмент в IT</strong>
                                  </h4>
                                  <p>В рамках специальности ведется подготовка востребованных специалистов, способных эффективно решать управленческие проблемы, реализовать инновационные идеи на основе современных знаний в области проектного менеджмента, цифровой экономики и бизнеса.</p>
                              </div>
                          </div>
                      </div>
              </div>
          </div>
      </section>
      <aside className="callout">
          <div className="text-vertical-center">
              <h1>Наши студенты - интеллектуальная элита Казахстана!</h1>
          </div>
      </aside>
      <section id="portfolio" className="portfolio">
          <div className="container">
              <div className="row">
                  <div className="col-lg-10 col-lg-offset-1 text-center">
                      <h2>Что получают студенты МУИТ?</h2>
                      <hr className="small"/>
                      <div className="row">
                          <div className="col-md-6">
                              <div className="portfolio-item">
                                      <img className="img-portfolio img-responsive" src="img/Studentsresult-image-5-0.jpg"/>
                                      <div className="student-life-text" style={{marginTop: '-15px'}}>Сертификат Университета Carnegie Mellon</div>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="portfolio-item">
                                      <img className="img-portfolio img-responsive" src="img/Studentsresult-image-10-0.png"/>
                                      <div className="student-life-text" style={{marginTop: '-15px'}}>Яркая, активная студенческая жизнь</div>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="portfolio-item">
                                      <img className="img-portfolio img-responsive" src="img/Studentsresult-image-6-0.png"/>
                                      <div className="student-life-text" style={{marginTop: '-15px'}}>Академическая мобильность</div>
                              </div>
                          </div>
                          <div className="col-md-6">
                              <div className="portfolio-item">
                                      <img className="img-portfolio img-responsive" src="img/Studentsresult-image-9-0.png"/>
                                      <div className="student-life-text" style={{marginTop: '-15px'}}>100 % трудоустройство выпускников</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <aside className="call-to-action bg-primary">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h3>Хочешь учиться в МУИТ?</h3>
                      <h3>Оставь свои данные и мы свяжемся с тобой!</h3>
                      <a href="#" className="btn btn-lg btn-light" data-toggle="modal" data-target=".forget-modal" >Подать заявку</a>
                  </div>
              </div>
          </div>
      </aside>
      <section id="contact" className="map">
          <iframe width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2906.7762669187964!2d76.90755611539878!3d43.23515028738046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3883692f027581ad%3A0x2426740f56437e63!2z0JzQtdC20LTRg9C90LDRgNC-0LTQvdGL0Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiDQuNC90YTQvtGA0LzQsNGG0LjQvtC90L3Ri9GFINGC0LXRhdC90L7Qu9C-0LPQuNC5!5e0!3m2!1sru!2skz!4v1464809363846&language=ru"></iframe>
          <br />
          <small>
              <a href="https://www.google.com/maps/place/%D0%9C%D0%B5%D0%B6%D0%B4%D1%83%D0%BD%D0%B0%D1%80%D0%BE%D0%B4%D0%BD%D1%8B%D0%B9+%D1%83%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82+%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D1%85+%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D0%B9/@43.235146,76.909745,15z/data=!4m5!3m4!1s0x0:0x2426740f56437e63!8m2!3d43.2351464!4d76.9097448?hl=en-US"></a>
          </small>
      </section>
      <div className="modal fade forget-modal" tabIndex="-1" role="dialog" aria-labelledby="myForgetModalLabel" aria-hidden="true">
    	<div className="modal-dialog modal-md">
    		<div className="modal-content">
        <form action="/" onSubmit={this.submitForm}>
    			<div className="modal-header">
    				<button type="button" className="close" data-dismiss="modal" onClick={this.cleanUser}>
    					<span aria-hidden="true">×</span>
    					<span className="sr-only">Close</span>
    				</button>
    				<h4 className="modal-title">Подать заявку в МУИТ</h4>
    			</div>
    			<div className="modal-body">
          {this.state.errors.summary && <p style={{ fontSize: '14px', color: 'red' }}>{this.state.errors.summary}</p>}
          {this.state.message && <p style={{ fontSize: '14px', color: 'green' }}>{this.state.message}</p>}

            <div className="form-group">
      				<input type="email"
                     className="form-control"
                     placeholder="Электронный адрес (example@example.com)"
                     name="email"
                     autoComplete="off"
                     onChange={this.changeUser}
                     value={this.state.user.email} required/>
            </div>
            <div className="form-group">
      				<input type="text"
                     className="form-control"
                     placeholder="Имя"
                     name="name"
                     autoComplete="off"
                     onChange={this.changeUser}
                     value={this.state.user.name} required/>
            </div>
            <div className="form-group">
      				<input type="text"
                     className="form-control"
                     placeholder="Фамилия"
                     name="lastname"
                     autoComplete="off"
                     onChange={this.changeUser}
                     value={this.state.user.lastname} required/>
            </div>
            <div className="form-group">
      				<InputElement mask="+7 (999) 999-99-99"
                     className="form-control"
                     placeholder="Номер телефона"
                     name="phone"
                     autoComplete="off"
                     onChange={this.changeUser}
                     value={this.state.user.phone} required/>
            </div>
            <div className="form-group">
              <select className="form-control" name="major" value={this.state.user.major} onChange={this.changeUser} required>
                <option value="">Выберите специальность</option>
                <option value="5В070300">Информационные системы</option>
                <option value="5В070400">Вычислительная техника и программное обеспечение</option>
                <option value="5В070500">Математическое и компьютерное моделирование</option>
                <option value="5В071900">Радиотехника, электроника и телекоммуникации</option>
                <option value="5В050400">Электронная журналистика</option>
                <option value="5В100200">Системы информационной безопасности</option>
                <option value="5В060200">Информатика</option>
              </select>
            </div>

    			</div>
    			<div className="modal-footer">
            <button type="submit" className="btn btn-success" disabled={!this.state.checkContent}>Отправить</button>
    				<button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.cleanUser}>Отменить</button>
    			</div>
          </form>
    		</div>
    	</div>
    </div>
      <footer>
          <div className="container">
              <div className="row">
                  <div className="col-lg-10 col-lg-offset-1 text-center">
                      <h4><strong>Международный Университет Информационных Технологий</strong></h4>
                      <p>050040 г. Алматы
                          <br/>ул. Манаса / Жандосова, 34 «А»/8 «А»</p>
                      <ul className="list-unstyled">
                          <li><i className="fa fa-phone fa-fw"></i> +7(727) 320-00-00</li>
                          <li><i className="fa fa-envelope-o fa-fw"></i> <a href="mailto:info@iitu.kz">info@iitu.kz</a>
                          </li>
                      </ul>
                      <br/>
                      <ul className="list-inline">
                          <li>
                              <a target="_blank" href="https://www.facebook.com/iitukz/"><i className="fa fa-facebook fa-fw fa-3x"></i></a>
                          </li>
                          <li>
                              <a target="_blank" href="https://twitter.com/iitukz"><i className="fa fa-twitter fa-fw fa-3x"></i></a>
                          </li>
                          <li>
                              <a target="_blank" href="https://www.instagram.com/iitu_kz/"><i className="fa fa-instagram fa-fw fa-3x"></i></a>
                          </li>
                          <li>
                              <a target="_blank" href="https://vk.com/iitu_kazakhstan"><i className="fa fa-vk fa-fw fa-3x"></i></a>
                          </li>
                      </ul>
                      <hr className="small"/>
                      <p className="text-muted">Copyright &copy; Automato 2017</p>
                  </div>
              </div>
          </div>
          <a id="to-top" href="#top" className="btn btn-dark btn-lg"><i className="fa fa-chevron-up fa-fw fa-1x"></i></a>
      </footer>
      </div>);
  }
}

export default App;
