import {createClient} from 'https://esm.sh/@supabase/supabase-js'
// require('dotenv').config();

const supabase = createClient('https://ofshehcojnwdhlbdsqqp.supabase.co','sb_publishable_4A_sEunFZ9XvZcPSywZI9w_RvOi45gf');
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit',async function(e){
e.preventDefault();
const access =
    document.getElementById("accessNumber")
    .value
    .trim()
    .toUpperCase();

  const password =
    document.getElementById("password")
    .value
    .trim();
    const { data, error } = await supabase.auth.signInWithPassword({
    email: access,
    password: password
});
if (error) {
    errorMsg.textContent = error.message;
    return;
}
const user = data.user;
    if(user != null){
    const { data: roleData, error: roleError } = await supabase
    .from("User_Role")
    .select("role_id")
    .eq("user_id", user.id)
    .single();
      const { data: role, error } = await supabase
    .from("Role")
    .select("name")
    .eq("id", roleData.role_id)
    .single();
      localStorage.setItem(
    "neoRole",
    role.name
  );
console.log("User ID:", user.id);
console.log("Role Data:", roleData);
console.log("Role Error:", roleError);
  localStorage.setItem(
    "neoUser",
    user.email
  );

  // ---------------------------------
  // REDIRECTS
  // ---------------------------------

  if(role.name === "Doctor"){

    window.location.href =
      "Doctor-Dashboard.html";
  }

  if(role.name === "Pharmacist"){

    window.location.href =
      "Pharmacist_Dashboard.html";
  }

  if(role.name === "Admin"){

    window.location.href =
      "Admin-Dashboard.html";
  }


    }
     
    
})
//const Pharmacist_id = await supabase.from('Pharmacist').select('pharmacist_id');
//look for user
//sign in user using password
//console.log(Pharmacist.data);
