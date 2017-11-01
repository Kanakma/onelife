webpackHotUpdate(0,{

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _Auth = __webpack_require__(5);

var _Auth2 = _interopRequireDefault(_Auth);

var _AdminEditGroupModal = __webpack_require__(628);

var _AdminEditGroupModal2 = _interopRequireDefault(_AdminEditGroupModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminGroups = function (_React$Component) {
  _inherits(AdminGroups, _React$Component);

  function AdminGroups(props) {
    _classCallCheck(this, AdminGroups);

    var _this = _possibleConstructorReturn(this, (AdminGroups.__proto__ || Object.getPrototypeOf(AdminGroups)).call(this, props));

    _this.state = {
      isOpen: false,
      groups: [],
      group: {},
      allgroups: []
    };
    _this.toggleModal = _this.toggleModal.bind(_this);
    _this.toggleModalClose = _this.toggleModalClose.bind(_this);
    _this.handleSearch = _this.handleSearch.bind(_this);
    return _this;
  }

  _createClass(AdminGroups, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _axios2.default.get('/group/getgroups', {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {
        _this2.setState({
          groups: res.data.groups,
          allgroups: res.data.groups
        });
      });
    }
  }, {
    key: 'toggleModal',
    value: function toggleModal(group) {
      this.setState({
        isOpen: !this.state.isOpen,
        group: group
      });
    }
  }, {
    key: 'toggleModalClose',
    value: function toggleModalClose() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(event) {
      var searchQuery = event.target.value.toLowerCase();
      if (searchQuery) {
        var groups = this.state.allgroups.filter(function (el) {
          var searchValue = el.group_name.toLowerCase() + ' ' + el.major.major_name.toLowerCase() + ' ' + el.major.major_department.department_name.toLowerCase();
          return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
          groups: groups
        });
      } else {
        this.setState({
          groups: this.state.allgroups
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'container clearfix' },
        _react2.default.createElement(
          'div',
          { className: 'bg-title', style: { display: 'flex' } },
          _react2.default.createElement(
            'h4',
            { style: { width: '70%' } },
            '\u0412\u0441\u0435 \u0433\u0440\u0443\u043F\u043F\u044B'
          ),
          _react2.default.createElement(
            'div',
            { style: { width: '30%', display: 'flex' } },
            _react2.default.createElement(
              'h4',
              null,
              '\u041F\u043E\u0438\u0441\u043A'
            ),
            _react2.default.createElement('input', { onChange: this.handleSearch, className: 'adminsearch', type: 'search', placeholder: '' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: ' my-content' },
          _react2.default.createElement(
            'div',
            { className: 'table-responsive  hidden-mobile visible-max visible-middle visible-ipad' },
            _react2.default.createElement(
              'table',
              { id: 'myTable', className: 'table table-striped functional-table' },
              _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text' },
                    '\u2116'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    '\u041A\u0430\u0444\u0435\u0434\u0440\u0430'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    '\u041A\u0443\u0440\u0441'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    '\u041A\u0443\u0440\u0430\u0442\u043E\u0440'
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    _react2.default.createElement(
                      'center',
                      null,
                      '\u041A\u043E\u043B-\u0432\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432'
                    )
                  ),
                  _react2.default.createElement(
                    'th',
                    { className: 'table-head-text table-b-left' },
                    _react2.default.createElement(
                      'center',
                      null,
                      '\u041E\u043F\u0446\u0438\u0438'
                    )
                  )
                )
              ),
              this.state.groups ? this.state.groups.map(function (group, g) {
                return _react2.default.createElement(
                  'tbody',
                  { key: g },
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      null,
                      g + 1
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'table-b-left' },
                      group.group_name
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'table-b-left' },
                      group.major.major_name
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'table-b-left' },
                      group.major.major_department.department_name
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'table-b-left', style: { textAlign: 'center' } },
                      group.course_number
                    ),
                    _react2.default.createElement(
                      'td',
                      { className: 'table-b-left' },
                      group.curator ? group.curator.user_id.name + ' ' + group.curator.user_id.lastname : 'Не назначен!'
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { textAlign: 'center' }, className: 'table-b-left' },
                      group.students.length
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { padding: '10px 20px' }, className: 'table-b-left' },
                      _react2.default.createElement(
                        'button',
                        { onClick: _this3.toggleModal.bind(_this3, group), className: 'btn btn-default btn-circle edit-btn-moreinfo', style: { background: 'none', position: 'absolute' } },
                        _react2.default.createElement('i', { className: 'fa fa-pencil' })
                      )
                    )
                  )
                );
              }) : _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'center',
                      null,
                      '---'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: { padding: '10px 20px' } },
                    '---'
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'table-responsive visible-mobile hidden-max-media hidden-middle hidden-ipad' },
            _react2.default.createElement(
              'table',
              { id: 'myTable', className: 'table table-striped' },
              this.state.groups ? this.state.groups.map(function (group, g) {
                return _react2.default.createElement(
                  'tbody',
                  { key: g },
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement('td', { className: 'mobile-table' }),
                    _react2.default.createElement(
                      'td',
                      null,
                      g + 1
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435'
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      group.group_name
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      group.major.major_name
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041A\u0430\u0444\u0435\u0434\u0440\u0430'
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      group.major.major_department.department_name
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041A\u0443\u0440\u0441'
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { textAlign: 'center' } },
                      group.course_number
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041A\u043E\u043B-\u0432\u043E \u0441\u0442\u0443\u0434\u0435\u043D\u0442\u043E\u0432'
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { textAlign: 'center' } },
                      group.students.length
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041A\u0443\u0440\u0430\u0442\u043E\u0440'
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      group.curator ? group.curator.user_id.name + ' ' + group.curator.user_id.lastname : 'Не назначен!'
                    )
                  ),
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      { className: 'mobile-table' },
                      '\u041E\u043F\u0446\u0438\u0438'
                    ),
                    _react2.default.createElement(
                      'td',
                      { style: { padding: '10px 20px' } },
                      _react2.default.createElement(
                        'button',
                        { onClick: _this3.toggleModal.bind(_this3, group), className: 'btn btn-default btn-circle edit-btn-moreinfo', style: { background: 'none', position: 'absolute' } },
                        _react2.default.createElement('i', { className: 'fa fa-pencil' })
                      )
                    )
                  )
                );
              }) : _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    '---'
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'center',
                      null,
                      '---'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { style: { padding: '10px 20px' } },
                    '---'
                  )
                )
              )
            )
          )
        ),
        _react2.default.createElement(_AdminEditGroupModal2.default, {
          show: this.state.isOpen,
          onClose: this.toggleModalClose,
          group: this.state.group
        })
      );
    }
  }]);

  return AdminGroups;
}(_react2.default.Component);

exports.default = AdminGroups;

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Auth = __webpack_require__(5);

var _Auth2 = _interopRequireDefault(_Auth);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _reactInputMask = __webpack_require__(16);

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminEditGroupModal = function (_React$Component) {
  _inherits(AdminEditGroupModal, _React$Component);

  function AdminEditGroupModal(props) {
    _classCallCheck(this, AdminEditGroupModal);

    var _this = _possibleConstructorReturn(this, (AdminEditGroupModal.__proto__ || Object.getPrototypeOf(AdminEditGroupModal)).call(this, props));

    _this.state = {
      editedGroup: {
        group_name: '',
        curator: '',
        course_number: 0,
        major: ''
      },
      teachers: [],
      majors: []
    };
    _this.editGroupFunc = _this.editGroupFunc.bind(_this);
    _this.changeGroup = _this.changeGroup.bind(_this);
    _this.deleteGroup = _this.deleteGroup.bind(_this);
    return _this;
  }

  _createClass(AdminEditGroupModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _axios2.default.get('/teacher/getteachers', {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {
        _this2.setState({
          teachers: res.data.allTchrs
        });
      });
      _axios2.default.get('/major/getmajors', {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {
        _this2.setState({
          majors: res.data.majors
        });
      });
    }
  }, {
    key: 'editGroupFunc',
    value: function editGroupFunc() {
      event.preventDefault();
      var group_id = this.props.group._id;
      var formData = 'editedGroup=' + JSON.stringify(this.state.editedGroup) + '&group_id=' + group_id;
      _axios2.default.post('/group/editgroup', formData, {
        responseType: 'json',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer ' + _Auth2.default.getToken()
        }
      });
    }
  }, {
    key: 'deleteGroup',
    value: function deleteGroup() {
      if (this.props.group.students.length > 0) {
        alert("Вы не можете удалить группу пока не удалите или не переопределите всех студентов группы!");
      } else {
        var formData = 'group_id=' + JSON.stringify(this.props.group._id);
        _axios2.default.post('/group/deletegroup', formData, {
          responseType: 'json',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then(function (res) {
          window.location.reload();
        });
      }
    }
  }, {
    key: 'changeGroup',
    value: function changeGroup(event) {
      var field = event.target.name;
      var editedGroup = this.state.editedGroup;
      editedGroup[field] = event.target.value;
      this.setState({
        editedGroup: editedGroup
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // Render nothing if the "show" prop is false
      if (!this.props.show) {
        return null;
      }

      // The gray background
      var backdropStyle = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 50,
        paddingLeft: '20%',
        overflow: 'auto'
      };

      // The modal "window"
      var modalStyle = {
        backgroundColor: '#fff',
        borderRadius: 5,
        maxWidth: 1000,
        minHeight: 500,
        margin: '35px auto',
        padding: 30
      };

      return _react2.default.createElement(
        'div',
        { style: backdropStyle },
        _react2.default.createElement(
          'div',
          { style: modalStyle },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-info waves-effect waves-light m-r-10', style: { float: "right" }, onClick: this.props.onClose },
            'X'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'form',
              { action: '/groups', onSubmit: this.editGroupFunc },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  null,
                  '\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442\u0430'
                ),
                _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: this.props.group.group_name,
                  name: 'group_name',
                  onChange: this.changeGroup,
                  value: this.state.editedGroup.group_name }),
                _react2.default.createElement('span', { className: 'bar' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  null,
                  '\u0421\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
                ),
                _react2.default.createElement(
                  'select',
                  { className: 'form-control', name: 'major', value: this.state.editedGroup.major, onChange: this.changeGroup },
                  _react2.default.createElement(
                    'option',
                    { value: '' },
                    '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C'
                  ),
                  this.state.majors.map(function (major, m) {
                    return _react2.default.createElement(
                      'option',
                      { key: m, value: major.major_id },
                      major.major_name
                    );
                  })
                ),
                _react2.default.createElement('span', { className: 'bar' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6' },
                  _react2.default.createElement(
                    'label',
                    null,
                    '\u041A\u0443\u0440\u0441'
                  ),
                  _react2.default.createElement('input', { type: 'number', className: 'form-control', placeholder: '\u041A\u0443\u0440\u0441',
                    name: 'course_number', value: this.state.editedGroup.course_number, onChange: this.changeGroup }),
                  _react2.default.createElement('span', { className: 'bar' })
                ),
                this.state.teachers ? _react2.default.createElement(
                  'div',
                  { className: 'col-md-6' },
                  _react2.default.createElement(
                    'label',
                    null,
                    '\u041A\u0443\u0440\u0430\u0442\u043E\u0440 \u0433\u0440\u0443\u043F\u043F\u044B'
                  ),
                  _react2.default.createElement(
                    'select',
                    { className: 'form-control', name: 'curator', value: this.state.editedGroup.curator, onChange: this.changeGroup },
                    _react2.default.createElement(
                      'option',
                      { value: '' },
                      '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0430 \u0433\u0440\u0443\u043F\u043F\u044B'
                    ),
                    this.state.teachers.map(function (teacher, t) {
                      return _react2.default.createElement(
                        'option',
                        { key: t, value: teacher.teacher_id },
                        teacher.name,
                        ' ',
                        teacher.lastname
                      );
                    })
                  ),
                  _react2.default.createElement('span', { className: 'bar' })
                ) : _react2.default.createElement(
                  'div',
                  { className: 'form-group' },
                  _react2.default.createElement(
                    'label',
                    null,
                    '\u041A\u0443\u0440\u0430\u0442\u043E\u0440 \u0433\u0440\u0443\u043F\u043F\u044B'
                  ),
                  _react2.default.createElement(
                    'select',
                    { className: 'form-control', name: 'curator', value: this.state.editedGroup.curator, onChange: this.changeGroup },
                    _react2.default.createElement(
                      'option',
                      { value: '' },
                      '\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0435\u0439'
                    )
                  ),
                  _react2.default.createElement('span', { className: 'bar' })
                )
              ),
              _react2.default.createElement(
                'button',
                { type: 'submit', className: 'btn btn-info waves-effect waves-light m-r-10', style: { marginTop: '15px' } },
                '\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F'
              ),
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-info waves-effect waves-light m-r-10', style: { marginTop: '15px' }, onClick: this.deleteGroup },
                '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443'
              )
            )
          )
        )
      );
    }
  }]);

  return AdminEditGroupModal;
}(_react2.default.Component);

exports.default = AdminEditGroupModal;

/***/ })

})