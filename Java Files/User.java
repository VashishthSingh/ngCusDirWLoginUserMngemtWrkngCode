package com.ngcusdirlogin;

public class User {
	private float ramUsed;
	private float diskUsed;
	private double cpuUsed;
	private String readDateAndTime;
	
	public User(float ramUsed, float diskUsed, double cpuUsed, String readDateAndTime) {
		super();
		this.ramUsed = ramUsed;
		this.diskUsed = diskUsed;
		this.cpuUsed = cpuUsed;
		this.readDateAndTime = readDateAndTime;
	}
	public float getRamUsed() {
		return ramUsed;
	}
	public void setRamUsed(float ramUsed) {
		this.ramUsed = ramUsed;
	}
	public float getDiskUsed() {
		return diskUsed;
	}
	public void setDiskUsed(float diskUsed) {
		this.diskUsed = diskUsed;
	}
	public double getCpuUsed() {
		return cpuUsed;
	}
	public void setCpuUsed(double cpuUsed) {
		this.cpuUsed = cpuUsed;
	}
	public String getReadDateAndTime() {
		return readDateAndTime;
	}
	public void setReadDateAndTime(String readDateAndTime) {
		this.readDateAndTime = readDateAndTime;
	}
	
	@Override
	public String toString() {
		return "User [ramUsed=" + ramUsed + ", diskUsed=" + diskUsed + ", cpuUsed=" + cpuUsed + ", readDateAndTime="
				+ readDateAndTime + "]";
	}
	
}
