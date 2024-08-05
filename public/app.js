// Initializing Supabase Client

const { createClient } = supabase;

const supaUrl = "https://wpwwrcoibelxotdsarus.supabase.co";
const supaAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwd3dyY29pYmVseG90ZHNhcnVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2Mzc5NjUsImV4cCI6MjAzODIxMzk2NX0.Z8VPmEmdGnzco7Egq7QN0Tf3HbAHA5-6yPRFeub8xv0";

const supaClient = createClient(supaUrl, supaAnonKey);

// html elements

const loginButton = document.getElementById("signInBtn");
const logoutButton = document.getElementById("signOutBtn");
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
const userDetails = document.getElementById("userDetails");
const myThingsSection = document.getElementById("myThings");
const myThingsList = document.getElementById("myThingsList");
const allThingsSection = document.getElementById("allThings");
const allThingsList = document.getElementById("allThingsList");
const createThing = document.getElementById("createThing");

// Event Listeners

loginButton.addEventListener("click", () => {
    supaClient.auth.signInWithOAuth({
        provider: "google",
    });
});

logoutButton.addEventListener("click", () => {
    supaClient.auth.signOut();
});

// init

checkUserOnStartUp();

supaClient.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
        adjustForUser(session.user);
    } else {
        adjustForNoUser();
    }
});

// function declarations

async function checkUserOnStartUp() {
    const {
        data: { user },
     } = await supaClient.auth.getUser();
     if (user) {
        adjustForUser(user);
     } else {
        adjustForNoUser();
     }
}

function adjustForUser(user) {
    whenSignedIn.hidden = false;
    whenSignedOut.hidden = true;
    myThingsSection.hidden = false;
    userDetails.innerHTML = `
    <h3>Welcome ${user.user_metadata.full_name}</h3>
    <img src="${user.user_metadata.avatar_url}" />
    <p>UID: ${user.id}</p>`;
}

function adjustForNoUser() {
    whenSignedIn.hidden = true;
    whenSignedOut.hidden = false;
    myThingsSection.hidden = true;
}