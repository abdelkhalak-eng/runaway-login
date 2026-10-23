const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const btnWrapper = document.querySelector('.btn-wrapper');

// التحقق من صحة المدخلات
function validateInputs() {
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.length > 5;
    const isPasswordValid = passwordInput.value.length >= 8;

    if (isEmailValid && isPasswordValid) {
        loginBtn.classList.add('ready');
        return true;
    } else {
        loginBtn.classList.remove('ready');
        return false;
    }
}

[emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
        validateInputs();
        // إعادة الزر لمكانه الأصلي بمجرد الكتابة لمحاولة التثبيت
        loginBtn.style.transform = 'translate(0, 0)';
    });
});

// وظيفة هروب الزر عند اقتراب الماوس أو اللمس
function runaway(e) {
    if (validateInputs()) return; // إذا كانت البيانات صحيحة، لا تهرب!

    // تحديد مسافة الهروب العشوائية مع ضمان بقائها داخل حدود معقولة في الشاشة
    const offsetRange = 120; 
    const randomX = (Math.random() - 0.5) * offsetRange * 2;
    const randomY = (Math.random() - 0.5) * offsetRange;

    loginBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// تفعيل التأثير عند حركة الماوس أو اللمس (للهواتف)
loginBtn.addEventListener('mouseover', runaway);
loginBtn.addEventListener('touchstart', (e) => {
    if (!validateInputs()) {
        e.preventDefault(); // منع النقر على الهاتف إذا لم تكن البيانات جاهزة
        runaway();
    }
});

// منع إرسال النموذج إذا لم يكن جاهزاً
document.getElementById('loginForm').addEventListener('submit', (e) => {
    if (!validateInputs()) {
        e.preventDefault();
    } else {
        alert('تم تسجيل الدخول بنجاح! 🎉');
    }
});
