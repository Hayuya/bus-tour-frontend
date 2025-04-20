# watchdog/watchdog.py
import time
import requests

CHECK_URL = "https://test01.detascent.com"  # 本番URL
SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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"  # 置き換えてください

def notify_slack(message: str):
    try:
        requests.post(SLACK_WEBHOOK_URL, json={"text": message})
    except Exception as e:
        print(f"Slack送信失敗: {e}")

def check_server():
    try:
        r = requests.get(CHECK_URL, timeout=10)
        if r.status_code == 200:
            notify_slack("✅ Webアプリ（バスツアー予約）は正常に稼働中です。")
        else:
            notify_slack(f"⚠️ ステータスコード異常: {r.status_code}")
    except Exception:
        notify_slack("❌ Webアプリが応答しません！")

if __name__ == "__main__":
    while True:
        check_server()
        time.sleep(15 * 60)
