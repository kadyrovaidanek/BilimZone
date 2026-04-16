import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Banknote,
    CreditCard,
    Landmark,
    Wallet,
    X,
    AlertCircle,
    CheckCircle2,
    Clock3,
} from "lucide-react";

type TransactionStatus = "pending" | "completed" | "failed";
type TransactionType = "deposit" | "withdraw";

type Transaction = {
    id: number;
    type: TransactionType;
    title: string;
    amount: number;
    date: string;
    status: TransactionStatus;
};

type PaymentMethod = "card" | "qr";
type WithdrawMethod = "bank_card" | "bank_account";

const mockTransactions: Transaction[] = [
    {
        id: 1,
        type: "deposit",
        title: "Пополнение кошелька",
        amount: 2500,
        date: "14.04.2026, 14:20",
        status: "completed",
    },
    {
        id: 2,
        type: "withdraw",
        title: "Вывод на банковскую карту",
        amount: 1200,
        date: "13.04.2026, 18:05",
        status: "pending",
    },
    {
        id: 3,
        type: "deposit",
        title: "Поступление от продажи материала",
        amount: 800,
        date: "12.04.2026, 10:40",
        status: "completed",
    },
    {
        id: 4,
        type: "withdraw",
        title: "Вывод на расчетный счет",
        amount: 500,
        date: "10.04.2026, 09:15",
        status: "failed",
    },
];

const formatMoney = (value: number) =>
    new Intl.NumberFormat("ru-RU").format(value) + " сом";

const pageAnim = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const listAnim = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
};

const itemAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

function StatusBadge({ status }: { status: TransactionStatus }) {
    if (status === "completed") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Завершено
            </span>
        );
    }

    if (status === "failed") {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700">
                <AlertCircle className="h-3.5 w-3.5" />
                Ошибка
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <Clock3 className="h-3.5 w-3.5" />
            В обработке
        </span>
    );
}

function TransactionIcon({ type }: { type: TransactionType }) {
    return (
        <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${type === "deposit"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-600"
                }`}
        >
            {type === "deposit" ? (
                <ArrowDownLeft className="h-5 w-5" />
            ) : (
                <ArrowUpRight className="h-5 w-5" />
            )}
        </div>
    );
}

function BalanceSkeleton() {
    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-48 animate-pulse bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 p-6">
                <div className="mb-6 h-4 w-28 rounded bg-slate-200" />
                <div className="mb-8 h-10 w-52 rounded bg-slate-200" />
                <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="h-11 w-full rounded-xl bg-slate-200 sm:w-36" />
                    <div className="h-11 w-full rounded-xl bg-slate-200 sm:w-36" />
                </div>
            </div>
        </div>
    );
}

function TransactionsSkeleton() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 h-5 w-44 animate-pulse rounded bg-slate-200" />
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex animate-pulse items-center gap-3 rounded-2xl border border-slate-100 p-4"
                    >
                        <div className="h-11 w-11 rounded-xl bg-slate-200" />
                        <div className="min-w-0 flex-1">
                            <div className="mb-2 h-4 w-40 rounded bg-slate-200" />
                            <div className="h-3 w-28 rounded bg-slate-100" />
                        </div>
                        <div className="hidden h-6 w-24 rounded-full bg-slate-100 sm:block" />
                        <div className="h-4 w-20 rounded bg-slate-200" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <motion.div
            variants={itemAnim}
            className="rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center shadow-sm"
        >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Wallet className="h-7 w-7" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
                Транзакций пока нет
            </h3>
            <p className="mx-auto max-w-md text-sm text-slate-500">
                После пополнения, вывода или покупки материалов история операций
                появится здесь.
            </p>
        </motion.div>
    );
}

function ModalShell({
    open,
    title,
    subtitle,
    children,
    onClose,
}: {
    open: boolean;
    title: string;
    subtitle: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[1px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div
                            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-5 flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {title}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function DepositModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (amount: number, method: PaymentMethod) => void;
}) {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState<PaymentMethod>("card");

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = Number(amount);
        if (!parsed || parsed <= 0) return;

        if (method === "card") {
            if (!cardNumber || !expiry || !cvv) return;
        }

        onSubmit(parsed, method);

        setAmount("");
        setMethod("card");
        setCardNumber("");
        setExpiry("");
        setCvv("");
    };

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            title="Пополнение"
            subtitle="Введите сумму и выберите способ пополнения"
        >
            <form onSubmit={submit} className="space-y-4">

                {/* 💰 СУММА */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Сумма
                    </label>
                    <input
                        type="number"
                        min="1"
                        placeholder="Например, 1000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                    />
                </div>

                {/* 💳 ВЫБОР МЕТОДА */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Метод пополнения
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        <button
                            type="button"
                            onClick={() => setMethod("card")}
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 ${method === "card"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200"
                                }`}
                        >
                            <CreditCard className="h-4 w-4" />
                            Карта
                        </button>

                        <button
                            type="button"
                            onClick={() => setMethod("qr")}
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 ${method === "qr"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200"
                                }`}
                        >
                            <Banknote className="h-4 w-4" />
                            QR
                        </button>

                    </div>
                </div>

                {/* 💳 КАРТА */}
                {method === "card" && (
                    <div className="space-y-3">

                        <input
                            type="text"
                            placeholder="Номер карты"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full rounded-2xl border px-4 py-3"
                        />

                        <div className="flex gap-3">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-1/2 rounded-2xl border px-4 py-3"
                            />

                            <input
                                type="text"
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-1/2 rounded-2xl border px-4 py-3"
                            />
                        </div>

                    </div>
                )}

                {/* 📱 QR */}
                {method === "qr" && (
                    <div className="flex flex-col items-center gap-4 mt-4">

                        <div className="w-40 h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                            QR CODE
                        </div>

                        <p className="text-sm text-slate-500 text-center">
                            Отсканируйте QR через мобильное приложение банка
                        </p>

                    </div>
                )}

                {/* 🔘 КНОПКИ */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full border rounded-2xl px-4 py-3"
                    >
                        Отмена
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-2xl px-4 py-3"
                    >
                        Пополнить
                    </button>
                </div>

            </form>
        </ModalShell>
    );
}

function WithdrawModal({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (amount: number, method: WithdrawMethod, requisites: string) => void;
}) {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState<WithdrawMethod>("bank_card");
    const [requisites, setRequisites] = useState("");

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = Number(amount);
        if (!parsed || parsed <= 0 || !requisites.trim()) return;
        onSubmit(parsed, method, requisites.trim());
        setAmount("");
        setMethod("bank_card");
        setRequisites("");
    };

    return (
        <ModalShell
            open={open}
            onClose={onClose}
            title="Вывод средств"
            subtitle="Укажите сумму и реквизиты для вывода"
        >
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Сумма
                    </label>
                    <input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        placeholder="Например, 500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Способ вывода
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => setMethod("bank_card")}
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${method === "bank_card"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <CreditCard className="h-4 w-4" />
                            На карту
                        </button>

                        <button
                            type="button"
                            onClick={() => setMethod("bank_account")}
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${method === "bank_account"
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            <Landmark className="h-4 w-4" />
                            На счет
                        </button>
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Реквизиты
                    </label>
                    <input
                        type="text"
                        placeholder={
                            method === "bank_card"
                                ? "Введите номер карты"
                                : "Введите номер счета"
                        }
                        value={requisites}
                        onChange={(e) => setRequisites(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
                    >
                        Вывести
                    </button>
                </div>
            </form>
        </ModalShell>
    );
}

export const WalletPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBalance(2100);
            setTransactions(mockTransactions);
            setIsLoading(false);
        }, 1100);

        return () => clearTimeout(timer);
    }, []);

    const sortedTransactions = useMemo(
        () => [...transactions].sort((a, b) => b.id - a.id),
        [transactions]
    );

    const handleDeposit = (amount: number, method: PaymentMethod) => {
        setBalance((prev) => prev + amount);

        setTransactions((prev) => [
            {
                id: Date.now(),
                type: "deposit",
                title:
                    method === "card"
                        ? "Пополнение с карты"
                        : "Пополнение через QR",
                amount,
                date: new Date().toLocaleString("ru-RU"),
                status: method === "qr" ? "pending" : "completed",
            },
            ...prev,
        ]);

        setIsDepositOpen(false);
    };

const handleWithdraw = (
    amount: number,
    method: WithdrawMethod,
    requisites: string
) => {
    setTransactions((prev) => [
        {
            id: Date.now(),
            type: "withdraw",
            title:
                method === "bank_card"
                    ? `Вывод на карту •••• ${requisites.slice(-4)}`
                    : "Вывод на банковский счет",
            amount,
            date: new Date().toLocaleString("ru-RU"),
            status: amount > balance ? "failed" : "pending",
        },
        ...prev,
    ]);

    if (amount <= balance) {
        setBalance((prev) => prev - amount);
    }

    setIsWithdrawOpen(false);
};

return (
    <motion.div
        variants={pageAnim}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-6xl p-4 sm:p-6"
    >
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Финансы
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Управляйте балансом, пополняйте кошелек, выводите средства и
                просматривайте историю транзакций.
            </p>
        </div>

        <div className="mb-6">
            {isLoading ? (
                <BalanceSkeleton />
            ) : (
                <motion.div
                    variants={itemAnim}
                    className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-6 text-white shadow-lg"
                >
                    <div className="mb-5 flex items-center gap-2 text-blue-50">
                        <Banknote className="h-5 w-5" />
                        <span className="text-sm font-medium">Текущий баланс</span>
                    </div>

                    <div className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
                        {formatMoney(balance)}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => setIsDepositOpen(true)}
                            className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 sm:w-auto"
                        >
                            Пополнить
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsWithdrawOpen(true)}
                            className="w-full rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto"
                        >
                            Вывести
                        </button>
                    </div>
                </motion.div>
            )}
        </div>

        {isLoading ? (
            <TransactionsSkeleton />
        ) : (
            <motion.section
                variants={listAnim}
                initial="hidden"
                animate="visible"
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            История транзакций
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Все операции по кошельку в одном месте
                        </p>
                    </div>
                </div>

                {sortedTransactions.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="space-y-3">
                        {sortedTransactions.map((transaction) => (
                            <motion.div
                                key={transaction.id}
                                variants={itemAnim}
                                className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50/60 sm:flex-row sm:items-center"
                            >
                                <TransactionIcon type={transaction.type} />

                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-semibold text-slate-900">
                                        {transaction.title}
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500">
                                        {transaction.date}
                                    </div>
                                </div>

                                <div className="sm:min-w-[130px]">
                                    <StatusBadge status={transaction.status} />
                                </div>

                                <div
                                    className={`text-sm font-semibold sm:min-w-[110px] sm:text-right ${transaction.type === "deposit"
                                            ? "text-emerald-600"
                                            : "text-rose-600"
                                        }`}
                                >
                                    {transaction.type === "deposit" ? "+" : "-"}
                                    {formatMoney(transaction.amount)}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.section>
        )}

        <DepositModal
            open={isDepositOpen}
            onClose={() => setIsDepositOpen(false)}
            onSubmit={handleDeposit}
        />

        <WithdrawModal
            open={isWithdrawOpen}
            onClose={() => setIsWithdrawOpen(false)}
            onSubmit={handleWithdraw}
        />
    </motion.div>
);
};

export default WalletPage;