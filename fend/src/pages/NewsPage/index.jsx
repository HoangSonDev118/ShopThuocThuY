import React from 'react'
import styleModule from './index.module.scss'

const posts = [
  {
    title: 'Mẹo chăm sóc thú cưng mùa mưa',
    description: 'Giữ môi trường khô thoáng, vệ sinh sạch sẽ và lựa chọn sản phẩm dinh dưỡng phù hợp để bảo vệ sức khỏe cho thú cưng.',
    date: '12/04/2025'
  },
  {
    title: 'Cách chọn thức ăn phù hợp theo độ tuổi',
    description: 'Mỗi giai đoạn phát triển của thú cưng đều cần chế độ dinh dưỡng khác nhau. Hãy chọn sản phẩm đúng nhu cầu để hỗ trợ tối ưu.',
    date: '03/04/2025'
  },
  {
    title: 'Lợi ích của chế phẩm sinh học cho gia súc',
    description: 'Sử dụng chế phẩm sinh học giúp cân bằng hệ tiêu hóa, hỗ trợ phát triển và tăng hiệu quả chăn nuôi bền vững.',
    date: '25/03/2025'
  }
]

const NewsPage = () => {
  return (
    <div className={`${styleModule.newsPage} grid wide`}>
      <div className={styleModule.pageHeader}>
        <span className={styleModule.kicker}>Tin tức</span>
        <h1>Tin tức & chia sẻ</h1>
      </div>

      <div className={styleModule.postList}>
        {posts.map((post, index) => (
          <article className={styleModule.postCard} key={index}>
            <span className={styleModule.postDate}>{post.date}</span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button type="button">Đọc thêm</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default NewsPage