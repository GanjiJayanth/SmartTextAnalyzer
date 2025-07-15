import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1 className="profile-title">
          Profile
          <span className="material-icons icon">bookmark_border</span>
        </h1>
      </header>

      <section className="profile-section">
        <div className="profile-row">
          <div className="label">Name</div>
          <div className="value">Karthik Sharma</div>
          <div className="action">
            <button className="btn-link">Update</button>
          </div>
        </div>
        <hr />

        <div className="profile-row">
          <div className="label">
            Email <span className="material-icons icon-sm">info_outline</span>
          </div>
          <div className="value">karthikeyasharma888@gmail.com</div>
        </div>
        <hr />

        <div className="profile-row">
          <div className="label">Password</div>
          <div className="value">••••••••</div>
          <div className="action">
            <button className="btn-link">Create</button>
          </div>
        </div>
      </section>

      <section className="profile-section">
        <h2 className="section-title">Linked Accounts</h2>
        <div className="linked-account">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ZZMP7trTarWN-umVmc4hS6tm6f8bC3LszwlLotwU35rWcJvtxAWVGZj9CXYGMwFdK2po9fwLKcv4JT5kEz7MsBQii48cuSKt7GwqGqdRl_QCU_5vRpnFdwyV9r_pUkQNnIdCM9dZAyLFGaDx7pjA3R8R4L_9w4g8p1Xv60pmHcvsA1tiXBJHDP4PL4ApPtv_Jz9BLxHzBTCAgkb00HE1xSGfGhk3TKJPIi9rmvNUd9ft0PdLg61iwtlo_S4YFM40GfICZNEcUjf6"
            alt="Google"
            className="linked-icon"
          />
          <span>Google</span>
        </div>
      </section>

      <section className="profile-section">
        <h2 className="section-title">Email Preferences</h2>
        <p className="subtext">
          Choose the types of emails you want to receive from us.
          <a href="#" className="btn-link ms-1">
            Update preference <span className="material-icons icon-sm">open_in_new</span>
          </a>
        </p>
      </section>

      <section className="profile-section">
        <h2 className="section-title">About You</h2>
        <p className="subtext">
          Understanding how you use our platform helps us develop features tailored to your writing needs.
        </p>

        <div className="profile-row">
          <label htmlFor="writingFor" className="label">
            Most of my writing is for:
          </label>
          <select id="writingFor" className="custom-select">
            <option>School</option>
            <option>Work</option>
            <option>Personal</option>
          </select>
        </div>

        <div className="profile-row">
          <label htmlFor="gradYear" className="label">
            My expected graduation year is:
          </label>
          <select id="gradYear" className="custom-select">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>
      </section>

      <hr />

      <section className="profile-section">
        <button className="btn-delete">Delete Account</button>
        <p className="delete-note">
          This account will no longer be available, and all your saved data will be permanently deleted.
        </p>
      </section>
    </div>
  );
};

export default Profile;
