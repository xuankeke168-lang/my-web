import { getCourses } from "@/lib/courses";

export default async function Courses() {
  const courses = await getCourses();
  const featuredCourses = courses.filter((c) => c.featured);
  const otherCourses = courses.filter((c) => !c.featured);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            课程推荐
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            精选优质 AI 课程，帮你快速入门，少走弯路
          </p>
        </div>

        {/* Featured Courses */}
        {featuredCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              精选课程
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredCourses.map((course) => (
                <a
                  key={course.id}
                  href={course.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500" />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                        {course.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded">
                        {course.platform}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-500 line-through">
                          ¥{course.originalPrice}
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ¥{course.currentPrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <span>★</span>
                        <span className="text-zinc-900 dark:text-white">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">
                        {course.enrollmentCount.toLocaleString()} 人已学
                      </span>
                      <span className="text-blue-600 group-hover:underline">
                        立即购买 →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Other Courses */}
        {otherCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              更多课程
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherCourses.map((course) => (
                <a
                  key={course.id}
                  href={course.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all"
                >
                  <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-500" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">
                        ¥{course.currentPrice}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {course.enrollmentCount.toLocaleString()} 人
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              课程推荐即将上线
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              我正在筛选优质的AI课程，敬请期待～
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ⚠️
            以上课程链接为推广链接，我可能会获得一定佣金。作为共学者，我只会推荐自己真正学习过且认为有价值的课程。
          </p>
        </div>
      </div>
    </div>
  );
}
