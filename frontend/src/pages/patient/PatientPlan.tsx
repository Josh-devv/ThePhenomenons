import { CheckCircle, Circle, Clock } from "lucide-react";

const planItems = [
  { category: "Nutrition", tasks: [
    { title: "Increase water intake to 8 glasses/day", status: "completed" },
    { title: "Add leafy greens to 2 meals daily", status: "completed" },
    { title: "Reduce sodium intake below 2300mg", status: "in-progress" },
    { title: "Include omega-3 rich foods 3x/week", status: "pending" },
  ]},
  { category: "Exercise", tasks: [
    { title: "30 minutes brisk walking daily", status: "completed" },
    { title: "Stretching routine - morning & evening", status: "in-progress" },
    { title: "Strength training 2x/week", status: "pending" },
  ]},
  { category: "Mental Health", tasks: [
    { title: "10 minutes daily meditation", status: "in-progress" },
    { title: "Sleep 7-8 hours consistently", status: "completed" },
    { title: "Weekly journaling session", status: "pending" },
  ]},
  { category: "Medical", tasks: [
    { title: "Blood pressure check weekly", status: "completed" },
    { title: "Follow-up with Dr. Chen - March 5", status: "pending" },
    { title: "Complete blood work panel", status: "pending" },
  ]},
];

const statusIcon = {
  completed: <CheckCircle className="h-5 w-5 text-success" />,
  "in-progress": <Clock className="h-5 w-5 text-warning" />,
  pending: <Circle className="h-5 w-5 text-muted-foreground" />,
};

export default function PatientPlan() {
  const totalTasks = planItems.reduce((sum, cat) => sum + cat.tasks.length, 0);
  const completedTasks = planItems.reduce((sum, cat) => sum + cat.tasks.filter(t => t.status === "completed").length, 0);
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-foreground">My Preventive Plan</h1>
        <p className="mt-1 text-body text-muted-foreground">Your personalized care plan from Dr. Sarah Chen</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 rounded-xl bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-foreground">Overall Progress</h3>
            <p className="mt-1 text-body text-muted-foreground">{completedTasks} of {totalTasks} tasks completed</p>
          </div>
          <span className="text-[28px] font-bold text-primary">{progress}%</span>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Plan Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {planItems.map((category) => (
          <div key={category.category} className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="text-foreground">{category.category}</h3>
            <div className="mt-4 space-y-3">
              {category.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  {statusIcon[task.status as keyof typeof statusIcon]}
                  <span className={`text-body ${task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
