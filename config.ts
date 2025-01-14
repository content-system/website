export const config = {
  port: 8082,
  allow: {
    origin: "*",
    credentials: "true",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    headers: "*",
  },
  log: {
    level: "info",
    map: {
      time: "@timestamp",
      msg: "message",
    },
  },
  middleware: {
    log: true,
    skips: "health,log,middleware",
    request: "request",
    response: "response",
    status: "status",
    size: "size",
  },
  db: {
    connectionString: "postgres://postgres:abcd1234@localhost/cms",
  },
  auth: {
    token: {
      secret: "secretbackoffice",
      expires: 86400000,
    },
    status: {
      success: 1,
      password_expired: 3,
      locked: 4,
      suspended: 5,
      disabled: 6,
    },
    lockedMinutes: 2,
    maxPasswordFailed: 2,
    payload: {
      id: "id",
      username: "username",
      email: "email",
      userType: "userType",
    },
    account: {
      displayName: "displayname",
    },
    userStatus: {
      activated: "A",
      deactivated: "D",
    },
    db: {
      user: "users",
      password: "passwords",
      id: "user_id",
      username: "username",
      status: "status",
      successTime: "success_time",
      failTime: "fail_time",
      failCount: "fail_count",
      lockedUntilTime: "locked_until_time",
    },
    query: `
      select u.user_id, u.username, u.display_name, email, u.status, p.* from users u
      inner join passwords p
        on u.user_id = p.user_id
      where username = $1 and u.status = 'A'`,
    expires: 500,
    template: {
      subject: "Verification Code",
      body: "%s Use this code for verification. This code will expire in %s minutes",
    },
  },
  map: {
    user_id: "id",
    display_name: "displayName",
    success_time: "successTime",
    fail_time: "failTime",
    fail_count: "failCount",
    locked_until_time: "lockedUntilTime",
  },
  signup: {
    expires: 500,
    userStatus: {
      registered: "R",
      codeSent: "V",
      activated: "A",
    },
    maxPasswordAge: 90,
    fields: {
      maxPasswordAge: "max_password_age",
      contact: "email",
      id: "user_id",
    },
    map2: {
      firstName: "surname",
      lastName: "givenName",
    },
    track: {
      createdAt: "created_at",
      createdBy: "created_by",
      updatedAt: "updated_at",
      updatedBy: "updated_by",
    },
    url: "http://localhost:8082/verify-account",
    template: {
      subject: "User registration confirmation",
      body: `
Please click this link to confirm to activate your account:<br><a href="%s">Confirm Now</a><br><br>
If the above button doesn't work for you, please click on the below link or copy paste it on to your browser<br>
<a href="%s">%s</a><br><br>
Your link will expire after "%s" minutes.

Hẫy nhấn đường link ở đây để kích hoạt cài khoản của bạn: <br><a href="%s">Xác nhận</a><br><br>
Nếu đường link đó không hoạt động, hãy sao chép đường link đó và dán vào trình duyệt web của bạn<br>
<a href="%s">%s</a><br><br>
Đường link này sẽ hết hạn sau "%s" phút.`,
    },
  },
  password: {
    max: 3,
    expires: 1500,
    db: {
      user: "users",
      password: "passwords",
    },
    fields: {
      id: "user_id",
      contact: "email",
      changedTime: "changed_time",
      failCount: "fail_count",
    },
    templates: {
      reset: {
        subject: "Passcode to reset password",
        body: `Your user name is %s. This is the passcode to reset your password: %s. This passcode will expire in %s minutes.<br>
        Tên đăng nhập của bạn là %s. Hãy dùng mã sau để tạo mật khẩu lại: %s. Mã này sẽ hết hạn trong %s phút.`,
      },
      change: {
        subject: "Passcode to change password",
        body: `Your user name is %s. This is the passcode to reset your password: %s. This passcode will expire in %s minutes.<br>
        Tên đăng nhập của bạn là %s. Hãy dùng mã sau để tạo mật khẩu lại: %s. Mã này sẽ hết hạn trong %s phút.`,
      },
    },
  },
  mail: {
    provider: "smtp",
    from: {
      name: "Supporter",
      email: "supporter@gmail.com",
    },
    key: " ",
    smtp: {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "",
        pass: "",
      },
    },
  },
}

export const env = {
  sit: {
    db: {
      database: "masterdata_sit",
    },
  },
  prd: {
    log: {
      level: "error",
    },
    middleware: {
      log: false,
    },
  },
}
