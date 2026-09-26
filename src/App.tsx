import React, { useState, useEffect } from "react";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [travelClass, setTravelClass] = useState("3A");
  const [journeyDate, setJourneyDate] = useState("");
  const [autoUpgradation, setAutoUpgradation] = useState(false);

  useEffect(() => {
    // Load saved settings from local storage
    chrome.storage.local.get(
      [
        "username",
        "password",
        "fromStation",
        "toStation",
        "trainNo",
        "travelClass",
        "journeyDate",
        "autoUpgradation",
      ],
      (result) => {
        if (result.username) setUsername(result.username);
        if (result.password) setPassword(result.password);
        if (result.fromStation) setFromStation(result.fromStation);
        if (result.toStation) setToStation(result.toStation);
        if (result.trainNo) setTrainNo(result.trainNo);
        if (result.travelClass) setTravelClass(result.travelClass);
        if (result.journeyDate) setJourneyDate(result.journeyDate);
        if (result.autoUpgradation !== undefined)
          setAutoUpgradation(result.autoUpgradation);
      },
    );
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const configData = {
      username,
      password,
      fromStation: fromStation.toUpperCase(),
      toStation: toStation.toUpperCase(),
      trainNo,
      travelClass,
      journeyDate,
      autoUpgradation,
      status: "armed",
    };

    chrome.storage.local.set(configData, () => {
      alert("IRCTC Tatkal configuration saved and extension is armed!");
    });
  };

  return (
    <div className="w-96 bg-slate-900 text-slate-100 p-4 font-sans text-sm">
      <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
        <h1 className="font-bold text-blue-400 text-base">
          IRCTC Tatkal Auto-Pilot
        </h1>
        <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded">
          v1.0
        </span>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        {/* Credentials */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
          <h2 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">
            1. Credentials
          </h2>
          <div>
            <label className="block text-slate-400 text-xs mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Journey Details */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
          <h2 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">
            2. Journey Details
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 text-xs mb-1">
                From Code
              </label>
              <input
                type="text"
                placeholder="e.g. NDLS"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100 uppercase"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs mb-1">
                To Code
              </label>
              <input
                type="text"
                placeholder="e.g. BCT"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100 uppercase"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-400 text-xs mb-1">
                Train Number
              </label>
              <input
                type="text"
                placeholder="e.g. 12952"
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-xs mb-1">Class</label>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100"
              >
                <option value="3A">3AC (3A)</option>
                <option value="2A">2AC (2A)</option>
                <option value="SL">Sleeper (SL)</option>
                <option value="CC">Chair Car (CC)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">
              Journey Date
            </label>
            <input
              type="date"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-100"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
          <h2 className="font-semibold text-slate-300 text-xs uppercase tracking-wider">
            3. Preferences
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoUpgradation"
              checked={autoUpgradation}
              onChange={(e) => setAutoUpgradation(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-0"
            />
            <label
              htmlFor="autoUpgradation"
              className="text-slate-300 text-xs cursor-pointer"
            >
              Consider for Auto Upgradation
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded transition duration-200 shadow-lg shadow-blue-900/30 cursor-pointer"
        >
          Save & Arm Extension
        </button>
      </form>
    </div>
  );
}
