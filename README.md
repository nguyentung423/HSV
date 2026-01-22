# User-Help Portal

Portal hướng dẫn sử dụng các hệ thống HVS với giao diện cây hệ sinh thái.

## 🚀 Chạy dự án chỉ với 1 lệnh (Docker Compose)

Sau khi clone về, bạn chỉ cần chạy lệnh sau trong thư mục gốc dự án:

```bash
docker-compose up --build
```

Sau khi build xong:

- Truy cập FE: http://localhost:5173
- Truy cập BE: http://localhost:8000

> **Lưu ý:**
>
> - Cần cài sẵn Docker & Docker Compose.
> - Không cần cài Python, Node.js, không cần setup gì thêm.
> - Mọi thứ sẽ tự động build và chạy.

## 🖥️ Cách chạy Local

### Backend

```bash
cd Source/BE
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd Source/FE
npm install
npm run dev
```

## 📁 Cấu trúc thư mục

```
User-Help/
├── docker/
│   ├── Dockerfile.be
│   └── Dockerfile.fe
├── Source/
│   ├── BE/
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   ├── data/
│   │   │   └── systems.json
│   │   └── static/
│   │       ├── videos/
│   │       ├── docs/
│   │       └── logo/
│   └── FE/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
├── docker-compose.yml
└── README.md
```

## ➕ Cách thêm hệ thống mới

1. Mở file `Source/BE/data/systems.json`
2. Thêm object mới vào mảng `systems`:

```json
{
  "id": "new-system",
  "name": "Tên hệ thống",
  "group": "fruit|branch|root",
  "appLink": "https://link-ung-dung.com",
  "videoFile": "new-system.mp4",
  "docFile": null,
  "segments": [
    {
      "title": "Giới thiệu",
      "start": 0,
      "end": 30,
      "summary": "Mô tả đoạn video"
    }
  ]
}
```

## 🎬 Cách thêm video/doc thật

### Video

1. Copy file `.mp4` vào thư mục `Source/BE/static/videos/`
2. Cập nhật `videoFile` trong `systems.json` với tên file

### Tài liệu (PDF/DOCX)

1. Copy file vào thư mục `Source/BE/static/docs/`
2. Cập nhật `docFile` trong `systems.json` với tên file

## 🎯 Các hệ thống

| ID            | Tên           | Nhóm      | Có tài liệu |
| ------------- | ------------- | --------- | ----------- |
| hvs-gate      | HVS-GATE      | Quả       | Không       |
| hvs-kios-lite | HVS-KIOS LITE | Quả       | Không       |
| hvs-food      | HVS-FOOD      | Nhánh cây | Không       |
| hvs-kios      | HVS-KIOS      | Nhánh cây | Không       |
| hvs-umea      | HVS-UMEA      | Rễ cây    | Có          |

## 📝 Ghi chú

- Video placeholder được tạo sẵn. Thay bằng file mp4 thật khi có.
- Nếu file video/doc không tồn tại, UI sẽ hiển thị thông báo nhẹ, không crash.
- Không cần đăng nhập/xác thực.
